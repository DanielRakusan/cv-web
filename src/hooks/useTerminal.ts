"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { pingBackend, fetchProjects, createTerminalSocket } from "@/lib/terminal-api";
import { siteConfig } from "@/config/site";

export type BackendStatus = "idle" | "waking" | "ready" | "error";

export type TerminalLine = {
  id: number;
  type: "stdout" | "stderr" | "system" | "input";
  text: string;
};

export type BackendProject = {
  id: string;
  name: string;
  description: string;
};

let lineIdCounter = 0;
function nextId() { return ++lineIdCounter; }

export function useTerminal() {
  const [status, setStatus] = useState<BackendStatus>("idle");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [running, setRunning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<BackendProject | null>(null);
  const [backendProjects, setBackendProjects] = useState<BackendProject[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const wakeAbortRef = useRef<AbortController | null>(null);

  const appendLine = useCallback((type: TerminalLine["type"], text: string) => {
    setLines((prev) => [...prev, { id: nextId(), type, text }]);
  }, []);

  const clearLines = useCallback(() => setLines([]), []);

  // Probudí Render backend
  const wakeBackend = useCallback(async () => {
    if (!siteConfig.renderApiUrl) {
      setStatus("error");
      return;
    }

    setStatus("waking");
    wakeAbortRef.current?.abort();
    const abort = new AbortController();
    wakeAbortRef.current = abort;

    const deadline = Date.now() + siteConfig.renderWakeTimeoutMs;

    while (Date.now() < deadline) {
      if (abort.signal.aborted) return;
      const ok = await pingBackend(abort.signal);
      if (ok) {
        const projects = await fetchProjects();
        setBackendProjects(projects);
        setStatus("ready");
        return;
      }
      await new Promise<void>((resolve) => {
        const t = setTimeout(resolve, siteConfig.renderPingIntervalMs);
        abort.signal.addEventListener("abort", () => { clearTimeout(t); resolve(); });
      });
    }

    if (!abort.signal.aborted) {
      setStatus("error");
    }
  }, []);

  // Spustí projekt
  const runProject = useCallback((project: BackendProject) => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setRunning(true);
    setSelectedProject(project);
    appendLine("system", `$ run ${project.id}`);

    const ws = createTerminalSocket(
      project.id,
      (msg) => {
        if (msg.type === "stdout") {
          // Detect clear-screen ANSI sequences (\x1b[2J, \x1b[3J)
          if (/\x1b\[\d*[23]?J/.test(msg.data)) {
            setLines([]);
          }
          appendLine("stdout", msg.data);
        } else if (msg.type === "stderr") appendLine("stderr", msg.data);
        else if (msg.type === "exit") {
          appendLine("system", `[Process exited with code ${msg.code}]`);
          setRunning(false);
        } else if (msg.type === "error") {
          appendLine("system", `[Error: ${msg.message}]`);
          setRunning(false);
        }
      },
      () => {
        setRunning(false);
        wsRef.current = null;
      }
    );

    wsRef.current = ws;
  }, [appendLine]);

  // Pošle vstup do běžícího procesu (PTY echo zobrazí vstup sám)
  const sendInput = useCallback((input: string) => {
    wsRef.current?.send(JSON.stringify({ type: "input", data: input }));
  }, []);

  // Zastaví běžící proces
  const stopProcess = useCallback(() => {
    wsRef.current?.send(JSON.stringify({ type: "stop" }));
    wsRef.current?.close();
    wsRef.current = null;
    setRunning(false);
    appendLine("system", "[Stopped]");
  }, [appendLine]);

  // Cleanup při unmount
  useEffect(() => {
    return () => {
      wakeAbortRef.current?.abort();
      wsRef.current?.close();
    };
  }, []);

  return {
    status,
    lines,
    running,
    selectedProject,
    backendProjects,
    wakeBackend,
    runProject,
    sendInput,
    stopProcess,
    clearLines,
  };
}

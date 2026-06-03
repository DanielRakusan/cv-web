"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { pingBackend, fetchProjects, createTerminalSocket } from "@/lib/terminal-api";
import { trackEvent } from "@/lib/track";
import { siteConfig } from "@/config/site";

export type BackendStatus = "idle" | "waking" | "ready" | "error";

export type BackendProject = {
  id: string;
  name: string;
  description: string;
};

export function useTerminal(lang: "cz" | "en" = "cz") {
  const [status, setStatus] = useState<BackendStatus>("idle");
  const [outputText, setOutputText] = useState("");
  const [running, setRunning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<BackendProject | null>(null);
  const [backendProjects, setBackendProjects] = useState<BackendProject[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const wakeAbortRef = useRef<AbortController | null>(null);

  const appendOutput = useCallback((text: string) => {
    setOutputText((prev) => prev + text);
  }, []);

  const clearLines = useCallback(() => setOutputText(""), []);

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
        const projects = await fetchProjects(lang);
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
    appendOutput(`\x1b[2m$ run ${project.id}\x1b[0m\n`);
    trackEvent("terminal_run", { project: project.id });

    const ws = createTerminalSocket(
      project.id,
      (msg) => {
        if (msg.type === "stdout") {
          if (/\x1b\[\d*[23]?J/.test(msg.data)) {
            setOutputText("");
          } else {
            appendOutput(msg.data);
          }
        } else if (msg.type === "stderr") {
          appendOutput(`\x1b[31m${msg.data}\x1b[0m`);
        } else if (msg.type === "exit") {
          appendOutput(`\x1b[2m\n[Process exited with code ${msg.code}]\x1b[0m`);
          setRunning(false);
        } else if (msg.type === "error") {
          appendOutput(`\x1b[31m\n[Error: ${msg.message}]\x1b[0m`);
          setRunning(false);
        }
      },
      () => {
        setRunning(false);
        wsRef.current = null;
      }
    );

    wsRef.current = ws;
  }, [appendOutput]);

  // Pošle vstup do běžícího procesu
  const sendInput = useCallback((input: string) => {
    wsRef.current?.send(JSON.stringify({ type: "input", data: input }));
  }, []);

  // Zastaví běžící proces
  const stopProcess = useCallback(() => {
    wsRef.current?.send(JSON.stringify({ type: "stop" }));
    wsRef.current?.close();
    wsRef.current = null;
    setRunning(false);
    appendOutput(`\x1b[2m\n[Stopped]\x1b[0m`);
  }, [appendOutput]);

  // Při změně jazyka přenačti projekty (jen pokud je backend už ready)
  useEffect(() => {
    if (status === "ready") {
      fetchProjects(lang).then(setBackendProjects);
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup při unmount
  useEffect(() => {
    return () => {
      wakeAbortRef.current?.abort();
      wsRef.current?.close();
    };
  }, []);

  return {
    status,
    outputText,
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

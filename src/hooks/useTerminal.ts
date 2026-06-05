"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { pingBackend, fetchProjects, createTerminalSocket } from "@/lib/terminal-api";
import { trackEvent } from "@/lib/track";
import { siteConfig } from "@/config/site";
import type { GuiWidget, FileDialogRequest, MessageboxRequest, CanvasItem, CanvasCmd, GuiMenu, GuiMenuItem } from "@/components/sections/TkinterModal";

export type BackendStatus = "idle" | "waking" | "ready" | "paused" | "error";

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

  // GUI state
  const [guiOpen, setGuiOpen] = useState(false);
  const [guiTitle, setGuiTitle] = useState<string | undefined>(undefined);
  const [guiWidgets, setGuiWidgets] = useState<GuiWidget[]>([]);
  const [fileDialogRequest, setFileDialogRequest] = useState<FileDialogRequest | null>(null);
  const [messageboxRequest, setMessageboxRequest] = useState<MessageboxRequest | null>(null);
  const [canvasImages, setCanvasImages] = useState<Record<string, string>>({});
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [canvasCmds, setCanvasCmds] = useState<CanvasCmd[]>([]);
  const [guiMenubar, setGuiMenubar] = useState<GuiMenu[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const wakeAbortRef = useRef<AbortController | null>(null);
  const langRef = useRef(lang);
  langRef.current = lang;

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
      const result = await pingBackend(abort.signal);
      if (result === "ok") {
        const projects = await fetchProjects(langRef.current);
        setBackendProjects(projects);
        setStatus("ready");
        return;
      }
      if (result === "paused") {
        setStatus("paused");
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

    // Reset GUI state when starting new run
    setGuiOpen(false);
    setGuiWidgets([]);
    setGuiTitle(undefined);
    setFileDialogRequest(null);
    setMessageboxRequest(null);
    setCanvasImages({});
    setCanvasItems([]);
    setCanvasCmds([]);
    setGuiMenubar([]);

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
          setGuiOpen(false);
        } else if (msg.type === "error") {
          appendOutput(`\x1b[31m\n[Error: ${msg.message}]\x1b[0m`);
          setRunning(false);
          setGuiOpen(false);
        }
        // ── GUI messages ──────────────────────────────────────────────────────
        else if (msg.type === "gui_open") {
          setGuiOpen(true);
          setGuiWidgets([]);
        } else if (msg.type === "gui_title") {
          setGuiTitle(msg.title as string);
        } else if (msg.type === "gui_widget") {
          const w: GuiWidget = {
            id: msg.id as string,
            kind: msg.kind as string,
            parent: msg.parent as string,
            text: msg.text as string | undefined,
            width: msg.width as number | undefined,
            height: msg.height as number | undefined,
            state: msg.state as string | undefined,
            values: msg.values as string[] | undefined,
          };
          setGuiWidgets(prev => {
            const exists = prev.findIndex(x => x.id === w.id);
            if (exists >= 0) {
              const next = [...prev];
              next[exists] = w;
              return next;
            }
            return [...prev, w];
          });
        } else if (msg.type === "gui_layout") {
          const widgetId = msg.id as string;
          const method = msg.method as string;
          const opts = msg.opts as Record<string, unknown>;
          setGuiWidgets(prev => prev.map(w =>
            w.id === widgetId ? { ...w, layout: { method, opts } } : w
          ));
        } else if (msg.type === "gui_update") {
          const widgetId = msg.id as string;
          setGuiWidgets(prev => prev.map(w =>
            w.id === widgetId ? { ...w, text: (msg.text as string) ?? w.text, state: (msg.state as string) ?? w.state } : w
          ));
        } else if (msg.type === "gui_destroy") {
          setGuiWidgets(prev => prev.filter(w => w.id !== msg.id));
        } else if (msg.type === "gui_close") {
          setGuiOpen(false);
          setGuiWidgets([]);
          setFileDialogRequest(null);
          setMessageboxRequest(null);
          setCanvasImages({});
          setCanvasItems([]);
          setCanvasCmds([]);
          setGuiMenubar([]);
        } else if (msg.type === "gui_canvas_image") {
          const item: CanvasItem = {
            itemId: msg.item_id as string,
            imageId: msg.image_id as string | null,
            x: msg.x as number,
            y: msg.y as number,
            anchor: msg.anchor as string,
          };
          setCanvasItems(prev => {
            const idx = prev.findIndex(ci => ci.itemId === item.itemId);
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = item;
              return next;
            }
            return [...prev, item];
          });
        } else if (msg.type === "gui_canvas_update") {
          const itemId = msg.item_id as string;
          const imageId = msg.image_id as string | null;
          setCanvasItems(prev => prev.map(ci => ci.itemId === itemId ? { ...ci, imageId } : ci));
        } else if (msg.type === "gui_canvas_delete") {
          const itemId = msg.item_id as string;
          setCanvasItems(prev => prev.filter(ci => ci.itemId !== itemId));
          if (itemId === "all") {
            const canvasId = msg.canvas_id as string;
            setCanvasCmds(prev => prev.filter(c => c.canvasId !== canvasId));
          } else {
            setCanvasCmds(prev => prev.filter(c => c.itemId !== itemId));
          }
        } else if (msg.type === "gui_canvas_cmd") {
          const cmd: CanvasCmd = {
            canvasId: msg.canvas_id as string,
            itemId: msg.item_id as string,
            cmd: msg.cmd as string,
            coords: (msg.coords as number[]) || [],
            fill: msg.fill as string | undefined,
            outline: msg.outline as string | undefined,
            width: msg.width as number | undefined,
            text: msg.text as string | undefined,
            font: msg.font as string | undefined,
            anchor: msg.anchor as string | undefined,
            imageId: msg.imageId as string | undefined,
            dash: msg.dash as number[] | null | undefined,
            arrow: msg.arrow as string | undefined,
            smooth: msg.smooth as boolean | undefined,
            start: msg.start as number | undefined,
            extent: msg.extent as number | undefined,
            style: msg.style as string | undefined,
          };
          setCanvasCmds(prev => {
            const idx = prev.findIndex(c => c.itemId === cmd.itemId);
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = cmd;
              return next;
            }
            return [...prev, cmd];
          });
        } else if (msg.type === "gui_canvas_coords") {
          const itemId = msg.item_id as string;
          const coords = msg.coords as number[];
          setCanvasCmds(prev => prev.map(c =>
            c.itemId === itemId ? { ...c, coords } : c
          ));
        } else if (msg.type === "gui_canvas_itemconfig") {
          const itemId = msg.item_id as string;
          const patch: Partial<CanvasCmd> = {};
          if (msg.fill !== undefined) patch.fill = msg.fill as string;
          if (msg.outline !== undefined) patch.outline = msg.outline as string;
          if (msg.width !== undefined) patch.width = msg.width as number;
          if (msg.text !== undefined) patch.text = msg.text as string;
          if (msg.font !== undefined) patch.font = msg.font as string;
          setCanvasCmds(prev => prev.map(c =>
            c.itemId === itemId ? { ...c, ...patch } : c
          ));
        } else if (msg.type === "gui_canvas_move") {
          const itemId = msg.item_id as string;
          const dx = msg.dx as number;
          const dy = msg.dy as number;
          setCanvasCmds(prev => prev.map(c => {
            if (c.itemId !== itemId) return c;
            const newCoords = c.coords.map((v, i) => v + (i % 2 === 0 ? dx : dy));
            return { ...c, coords: newCoords };
          }));
        } else if (msg.type === "gui_image") {
          if (msg.b64) {
            const imageId = msg.id as string;
            const b64 = msg.b64 as string;
            setCanvasImages(prev => ({ ...prev, [imageId]: b64 }));
          }
        } else if (msg.type === "gui_image_zoom") {
          // Zoom obrázku — zkopírujeme b64 ze zdrojového obrázku pod novým id
          const sourceId = msg.source_id as string;
          const newId = msg.id as string;
          setCanvasImages(prev => {
            const srcB64 = prev[sourceId];
            if (!srcB64) return prev;
            return { ...prev, [newId]: srcB64 };
          });
        } else if (msg.type === "gui_menubar") {
          // Celý menubar — seznam top-level menu s jejich položkami
          const menuId = msg.menu_id as string;
          const rawItems = (msg.items as Array<Record<string, unknown>>) || [];
          const items: GuiMenuItem[] = rawItems.map(it => ({
            id: it.id as string,
            kind: (it.type as string) || "command",
            label: (it.label as string) || "",
            accelerator: (it.accelerator as string) || "",
            state: (it.state as string) || "normal",
            submenuId: (it.submenu_id as string | undefined),
          }));
          setGuiMenubar([{ id: menuId, label: "", items }]);
        } else if (msg.type === "gui_menu_item") {
          // Inkrementální přidání položky do menu
          const menuId = msg.menu_id as string;
          const item: GuiMenuItem = {
            id: msg.item_id as string,
            kind: msg.kind as string,
            label: (msg.label as string) || "",
            accelerator: (msg.accelerator as string) || "",
            state: (msg.state as string) || "normal",
            submenuId: msg.submenu_id as string | undefined,
          };
          setGuiMenubar(prev => {
            const idx = prev.findIndex(m => m.id === menuId);
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = { ...next[idx], items: [...next[idx].items, item] };
              return next;
            }
            return [...prev, { id: menuId, label: item.label, items: [item] }];
          });
        } else if (msg.type === "gui_file_download") {
          // Backend posílá obsah souboru ke stažení
          try {
            const blob = new Blob(
              [Uint8Array.from(atob(msg.data as string), c => c.charCodeAt(0))],
              { type: "application/octet-stream" }
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = (msg.filename as string) || "output";
            a.click();
            URL.revokeObjectURL(url);
          } catch (e) {
            // ignore download errors silently
          }
        } else if (msg.type === "gui_treeview_insert") {
          // Treeview řádek — přidáme do widget state
          const tvId = msg.id as string;
          const row = { id: msg.row_id as string, text: msg.text as string, values: (msg.values as unknown[]) || [] };
          setGuiWidgets(prev => prev.map(w =>
            w.id === tvId ? { ...w, rows: [...(w.rows || []), row] } : w
          ));
        } else if (msg.type === "gui_treeview_delete") {
          const tvId = msg.id as string;
          const items = (msg.items as string[]) || [];
          setGuiWidgets(prev => prev.map(w =>
            w.id === tvId ? { ...w, rows: (w.rows || []).filter((r: {id: string}) => !items.includes(r.id)) } : w
          ));
        } else if (msg.type === "gui_treeview_heading") {
          const tvId = msg.id as string;
          const col = msg.col as string;
          const text = msg.text as string;
          setGuiWidgets(prev => prev.map(w => {
            if (w.id !== tvId) return w;
            const headings = { ...(w.headings || {}), [col]: text };
            return { ...w, headings };
          }));
        } else if (msg.type === "gui_scrollbar_set") {
          // Scrollbar pozice — aktualizujeme widget
          const sbId = msg.id as string;
          setGuiWidgets(prev => prev.map(w =>
            w.id === sbId ? { ...w, scrollLo: msg.lo as number, scrollHi: msg.hi as number } : w
          ));
        } else if (msg.type === "gui_file_dialog") {
          setFileDialogRequest({
            id: msg.id as string,
            mode: (msg.mode as FileDialogRequest["mode"]) || "open",
            title: msg.title as string | undefined,
            filetypes: msg.filetypes as [string, string][] | undefined,
            initialdir: msg.initialdir as string | undefined,
            initialfile: msg.initialfile as string | undefined,
            defaultextension: msg.defaultextension as string | undefined,
          });
          setGuiOpen(true);
        } else if (msg.type === "gui_file_saved") {
          // Soubor uložen na serveru — zavřeme file dialog
          setFileDialogRequest(null);
        } else if (msg.type === "gui_messagebox") {
          if (msg.kind === "info" || msg.kind === "warning" || msg.kind === "error") {
            // Auto-responding dialogs that don't need user interaction for okcancel etc.
          }
          setMessageboxRequest({
            id: (msg.id as string) || `mb_${Date.now()}`,
            kind: msg.kind as MessageboxRequest["kind"],
            title: msg.title as string | undefined,
            message: msg.message as string | undefined,
          });
          setGuiOpen(true);
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

  // Pošle GUI event (kliknutí, input) do backendu
  const sendGuiEvent = useCallback((widgetId: string, event: string, value?: string) => {
    wsRef.current?.send(JSON.stringify({ type: "gui_event", widget_id: widgetId, event, value: value ?? "" }));
  }, []);

  // Upload souboru přes WebSocket — backend ho uloží do session složky a vrátí cestu
  const sendFileUpload = useCallback((dialogId: string, filename: string, b64: string) => {
    wsRef.current?.send(JSON.stringify({ type: "gui_file_upload", id: dialogId, filename, data: b64 }));
  }, []);

  // Odpověď na file dialog (jen pokud backend nepoužívá upload)
  const sendFileResponse = useCallback((dialogId: string, filePath: string) => {
    wsRef.current?.send(JSON.stringify({ type: "gui_response", id: dialogId, value: filePath }));
    setFileDialogRequest(null);
  }, []);

  // Odpověď na messagebox
  const sendMessageboxResponse = useCallback((id: string, value: string) => {
    wsRef.current?.send(JSON.stringify({ type: "gui_response", id, value }));
    setMessageboxRequest(null);
    // Pro info/warning/error dialogy bez id nemáme na co čekat — jen zavřeme
    if (!id) setGuiOpen(false);
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
    // GUI
    guiOpen,
    guiTitle,
    guiWidgets,
    guiMenubar,
    canvasImages,
    canvasItems,
    canvasCmds,
    fileDialogRequest,
    messageboxRequest,
    sendGuiEvent,
    sendFileUpload,
    sendFileResponse,
    sendMessageboxResponse,
  };
}

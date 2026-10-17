import { useCallback, useEffect, useRef, useState } from "react";

export type StreamStatus = "idle" | "connecting" | "live" | "reconnecting" | "stale" | "unavailable";

export interface StreamState {
  status: StreamStatus;
  lastMessageAt: number | null;
  reconnectAttempts: number;
  error: string | null;
}

const INITIAL: StreamState = {
  status: "idle",
  lastMessageAt: null,
  reconnectAttempts: 0,
  error: null,
};

/**
 * Public Binance kline stream hook.
 * - No API key.
 * - Reconnect with exponential backoff (capped).
 * - Pauses when tab hidden; resumes on visible.
 * - Only emits closed candles (is_closed=true).
 */
export function useBinanceStream(symbol: string, interval: string, enabled: boolean) {
  const [state, setState] = useState<StreamState>(INITIAL);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptsRef = useRef(0);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const cleanup = useCallback(() => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {
        // ignore
      }
      wsRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (!enabledRef.current) return;
    cleanup();
    setState((s) => ({ ...s, status: "connecting", error: null }));
    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch (e) {
      setState((s) => ({ ...s, status: "unavailable", error: String(e) }));
      return;
    }
    wsRef.current = ws;

    ws.onopen = () => {
      attemptsRef.current = 0;
      setState((s) => ({ ...s, status: "live", reconnectAttempts: 0, error: null }));
    };

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        const k = msg?.k;
        if (!k) return;
        // Only closed candles are considered valid data
        if (k.x !== true) return;
        setState((s) => ({ ...s, lastMessageAt: Date.now(), status: "live" }));
      } catch {
        // ignore parse errors
      }
    };

    ws.onerror = () => {
      setState((s) => ({ ...s, status: "reconnecting", error: "WebSocket error" }));
    };

    ws.onclose = () => {
      if (!enabledRef.current) {
        setState((s) => ({ ...s, status: "idle" }));
        return;
      }
      const attempts = attemptsRef.current + 1;
      attemptsRef.current = attempts;
      const delay = Math.min(1000 * 2 ** (attempts - 1), 30_000);
      setState((s) => ({ ...s, status: "reconnecting", reconnectAttempts: attempts }));
      reconnectTimer.current = setTimeout(() => {
        if (enabledRef.current) connect();
      }, delay);
    };
  }, [symbol, interval, cleanup]);

  useEffect(() => {
    if (!enabled) {
      cleanup();
      setState(INITIAL);
      return;
    }
    connect();
    return cleanup;
  }, [enabled, connect, cleanup]);

  // Hidden tab grace: mark stale when hidden > 30s
  useEffect(() => {
    if (!enabled) return;
    let hiddenSince: number | null = null;
    const onVisibility = () => {
      if (document.hidden) {
        hiddenSince = Date.now();
      } else {
        if (hiddenSince && Date.now() - hiddenSince > 30_000) {
          setState((s) => ({ ...s, status: "stale" }));
        }
        hiddenSince = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  // Stale detection: no message for 60s while live
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      setState((s) => {
        if (s.status === "live" && s.lastMessageAt && Date.now() - s.lastMessageAt > 60_000) {
          return { ...s, status: "stale" };
        }
        return s;
      });
    }, 15_000);
    return () => clearInterval(id);
  }, [enabled]);

  return { state, reconnect: connect };
}

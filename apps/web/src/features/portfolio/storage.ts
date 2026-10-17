import { useCallback, useState } from "react";
import type { Holding, PortfolioState } from "./types";

const STORAGE_KEY = "rt:portfolio";

function read(): PortfolioState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { holdings: [], updatedAt: null };
    const parsed = JSON.parse(raw) as PortfolioState;
    if (!Array.isArray(parsed.holdings)) return { holdings: [], updatedAt: null };
    return parsed;
  } catch {
    return { holdings: [], updatedAt: null };
  }
}

function write(state: PortfolioState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function usePortfolio() {
  const [state, setState] = useState<PortfolioState>(() => read());

  const add = useCallback((holding: Omit<Holding, "id">) => {
    setState((prev) => {
      const next: PortfolioState = {
        holdings: [...prev.holdings, { ...holding, id: crypto.randomUUID() }],
        updatedAt: new Date().toISOString(),
      };
      write(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setState((prev) => {
      const next: PortfolioState = {
        holdings: prev.holdings.filter((h) => h.id !== id),
        updatedAt: new Date().toISOString(),
      };
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    const next: PortfolioState = { holdings: [], updatedAt: new Date().toISOString() };
    write(next);
    setState(next);
  }, []);

  return { state, add, remove, clear };
}

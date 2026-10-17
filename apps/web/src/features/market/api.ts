import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";

export interface Instrument {
  instrument_id: string;
  display_symbol: string;
  base_asset: string;
  quote_asset: string;
}

export interface Candle {
  instrument_id: string;
  interval: "15m" | "1h" | "1d";
  open_time: string;
  close_time: string;
  is_closed: boolean;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export function useInstruments() {
  return useQuery<Instrument[]>({
    queryKey: ["market", "instruments"],
    queryFn: () => apiFetch<Instrument[]>("/api/v1/market/instruments"),
  });
}

export function useCandles(instrumentId: string | null, interval: "15m" | "1h" | "1d") {
  return useQuery<Candle[]>({
    queryKey: ["market", "candles", instrumentId, interval],
    queryFn: () =>
      apiFetch<Candle[]>(
        `/api/v1/market/candles?instrument_id=${encodeURIComponent(instrumentId ?? "")}&interval=${interval}`,
      ),
    enabled: instrumentId !== null,
  });
}

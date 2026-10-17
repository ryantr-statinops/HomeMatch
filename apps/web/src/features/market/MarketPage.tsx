import { useState } from "react";
import Container from "../../components/layout/Container";
import { useInstruments, useCandles, type Instrument, type Candle } from "./api";

const INTERVALS = ["15m", "1h", "1d"] as const;
type Interval = (typeof INTERVALS)[number];

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="panel animate-pulse">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-4 h-8 w-32 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="panel text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="panel text-center">
      <p className="text-destructive">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-secondary"
      >
        Thử lại
      </button>
    </div>
  );
}

function CandleTable({ candles }: { candles: Candle[] }) {
  if (candles.length === 0) {
    return <EmptyState message="Không có nến cho khoảng thời gian này." />;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Mở</th>
            <th className="px-3 py-2">Cao</th>
            <th className="px-3 py-2">Thấp</th>
            <th className="px-3 py-2">Đóng</th>
            <th className="px-3 py-2">Khối lượng</th>
            <th className="px-3 py-2">Bắt đầu</th>
          </tr>
        </thead>
        <tbody>
          {candles.map((c) => (
            <tr key={c.open_time} className="border-t border-border">
              <td className="px-3 py-2 font-mono">{c.open}</td>
              <td className="px-3 py-2 font-mono text-primary">{c.high}</td>
              <td className="px-3 py-2 font-mono text-destructive">{c.low}</td>
              <td className="px-3 py-2 font-mono font-semibold">{c.close}</td>
              <td className="px-3 py-2 font-mono">{c.volume}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">
                {new Date(c.open_time).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarketPage() {
  const instrumentsQuery = useInstruments();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [interval, setInterval] = useState<Interval>("1h");

  const effectiveId = selectedId ?? instrumentsQuery.data?.[0]?.instrument_id ?? null;
  const candlesQuery = useCandles(effectiveId, interval);

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Thị trường</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Binance Spot · dữ liệu tổng hợp (fixture)
      </p>

      <section aria-labelledby="instruments-heading" className="mt-6">
        <h2 id="instruments-heading" className="sr-only">
          Danh sách tài sản
        </h2>
        {instrumentsQuery.isLoading ? (
          <LoadingSkeleton />
        ) : instrumentsQuery.isError ? (
          <ErrorState
            message="Không tải được danh sách tài sản."
            onRetry={() => instrumentsQuery.refetch()}
          />
        ) : !instrumentsQuery.data || instrumentsQuery.data.length === 0 ? (
          <EmptyState message="Chưa có tài sản nào." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {instrumentsQuery.data.map((inst: Instrument) => {
              const isSelected = inst.instrument_id === effectiveId;
              return (
                <button
                  key={inst.instrument_id}
                  type="button"
                  onClick={() => setSelectedId(inst.instrument_id)}
                  className={`panel text-left transition-colors ${
                    isSelected ? "border-primary ring-1 ring-primary" : "hover:bg-secondary"
                  }`}
                >
                  <p className="text-xs text-muted-foreground">
                    {inst.base_asset}/{inst.quote_asset}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{inst.display_symbol}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {inst.instrument_id}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section aria-labelledby="candles-heading" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="candles-heading" className="text-lg font-semibold">Nến</h2>
          <div className="flex gap-2" role="tablist" aria-label="Khoảng thời gian">
            {INTERVALS.map((iv) => (
              <button
                key={iv}
                type="button"
                role="tab"
                aria-selected={interval === iv}
                onClick={() => setInterval(iv)}
                className={`rounded-lg border px-3 py-1.5 text-sm ${
                  interval === iv
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-secondary"
                }`}
              >
                {iv}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          {candlesQuery.isLoading ? (
            <div className="panel animate-pulse">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="mt-2 h-4 w-full rounded bg-muted" />
              <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
            </div>
          ) : candlesQuery.isError ? (
            <ErrorState
              message="Không tải được dữ liệu nến."
              onRetry={() => candlesQuery.refetch()}
            />
          ) : (
            <CandleTable candles={candlesQuery.data ?? []} />
          )}
        </div>
      </section>
    </Container>
  );
}

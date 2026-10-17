import { useMemo } from "react";
import Container from "../../components/layout/Container";
import { usePortfolio } from "./storage";
import { ManualEntryForm } from "./ManualEntryForm";
import { CsvImport } from "./CsvImport";
import { useCandles } from "../market/api";
import type { Holding } from "./types";

function instrumentLabel(id: string): string {
  if (id === "binance:spot:BTCUSDT") return "BTC/USDT";
  if (id === "binance:spot:ETHUSDT") return "ETH/USDT";
  return id;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="panel text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

function lastClose(candles: { close: string }[] | undefined): number | null {
  if (!candles || candles.length === 0) return null;
  const v = parseFloat(candles[candles.length - 1].close);
  return Number.isFinite(v) ? v : null;
}

interface RowCalc {
  holding: Holding;
  price: number | null;
  value: number | null;
  cost: number;
  pnl: number | null;
  pnlPct: number | null;
}

export function PortfolioPage() {
  const { state, add, remove, clear } = usePortfolio();
  const btcCandles = useCandles("binance:spot:BTCUSDT", "1h");
  const ethCandles = useCandles("binance:spot:ETHUSDT", "1h");

  const prices: Record<string, number | null> = {
    "binance:spot:BTCUSDT": lastClose(btcCandles.data),
    "binance:spot:ETHUSDT": lastClose(ethCandles.data),
  };

  const rows: RowCalc[] = useMemo(() => {
    return state.holdings.map((h) => {
      const amount = parseFloat(h.amount);
      const avgCost = parseFloat(h.avg_cost);
      const price = prices[h.instrument_id] ?? null;
      const cost = Number.isFinite(amount) && Number.isFinite(avgCost) ? amount * avgCost : 0;
      const value = price !== null && Number.isFinite(amount) ? amount * price : null;
      const pnl = value !== null ? value - cost : null;
      const pnlPct = cost > 0 && pnl !== null ? (pnl / cost) * 100 : null;
      return { holding: h, price, value, cost, pnl, pnlPct };
    });
  }, [state.holdings, prices]);

  const totals = useMemo(() => {
    let cost = 0;
    let value = 0;
    let hasPrice = false;
    for (const r of rows) {
      cost += r.cost;
      if (r.value !== null) {
        value += r.value;
        hasPrice = true;
      }
    }
    const pnl = hasPrice ? value - cost : null;
    const pnlPct = cost > 0 && pnl !== null ? (pnl / cost) * 100 : null;
    return { cost, value: hasPrice ? value : null, pnl, pnlPct };
  }, [rows]);

  const valuationTime =
    btcCandles.data && btcCandles.data.length > 0
      ? btcCandles.data[btcCandles.data.length - 1].close_time
      : null;

  return (
    <Container className="py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Danh mục</h1>
        {state.holdings.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground hover:bg-secondary"
          >
            Xóa tất cả
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Spot long/cash · base USDT · dữ liệu giá từ fixture
      </p>

      <section className="mt-6">
        <ManualEntryForm onAdd={add} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Nhập CSV</h2>
        <p className="mb-2 text-xs text-muted-foreground">
          Header: <code className="font-mono">instrument_id,amount,avg_cost</code>
        </p>
        <CsvImport
          onImport={(rows) => {
            for (const r of rows) add(r);
          }}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Holdings</h2>
        {state.holdings.length === 0 ? (
          <EmptyState message="Chưa có holding nào. Thêm thủ công hoặc import CSV." />
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-left text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Tài sản</th>
                    <th className="px-3 py-2">Số lượng</th>
                    <th className="px-3 py-2">Giá vốn</th>
                    <th className="px-3 py-2">Giá hiện tại</th>
                    <th className="px-3 py-2">Giá trị</th>
                    <th className="px-3 py-2">P&L</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.holding.id} className="border-t border-border">
                      <td className="px-3 py-2 font-medium">{instrumentLabel(r.holding.instrument_id)}</td>
                      <td className="px-3 py-2 font-mono">{r.holding.amount}</td>
                      <td className="px-3 py-2 font-mono">{r.holding.avg_cost}</td>
                      <td className="px-3 py-2 font-mono">
                        {r.price !== null ? r.price.toFixed(2) : "—"}
                      </td>
                      <td className="px-3 py-2 font-mono">
                        {r.value !== null ? r.value.toFixed(2) : "—"}
                      </td>
                      <td
                        className={`px-3 py-2 font-mono ${
                          r.pnl === null
                            ? "text-muted-foreground"
                            : r.pnl >= 0
                              ? "text-primary"
                              : "text-destructive"
                        }`}
                      >
                        {r.pnl !== null
                          ? `${r.pnl >= 0 ? "+" : ""}${r.pnl.toFixed(2)} (${r.pnlPct?.toFixed(2)}%)`
                          : "—"}
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => remove(r.holding.id)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-2 rounded-lg border border-border bg-secondary/50 p-4 text-sm sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Tổng giá vốn</p>
                <p className="font-mono font-semibold">{totals.cost.toFixed(2)} USDT</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tổng giá trị</p>
                <p className="font-mono font-semibold">
                  {totals.value !== null ? `${totals.value.toFixed(2)} USDT` : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">P&L</p>
                <p
                  className={`font-mono font-semibold ${
                    totals.pnl === null
                      ? "text-muted-foreground"
                      : totals.pnl >= 0
                        ? "text-primary"
                        : "text-destructive"
                  }`}
                >
                  {totals.pnl !== null
                    ? `${totals.pnl >= 0 ? "+" : ""}${totals.pnl.toFixed(2)} (${totals.pnlPct?.toFixed(2)}%)`
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Valuation time</p>
                <p className="font-mono text-xs">
                  {valuationTime
                    ? new Date(valuationTime).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
                    : "—"}
                </p>
              </div>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              P&L là client-computed từ giá fixture, không phải giá live. Cashflow không được coi là trading profit.
            </p>
          </>
        )}
      </section>
    </Container>
  );
}

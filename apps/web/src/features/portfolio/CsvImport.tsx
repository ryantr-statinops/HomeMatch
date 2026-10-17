import { useRef, useState } from "react";
import type { Holding } from "./types";

interface ParsedRow {
  instrument_id: string;
  amount: string;
  avg_cost: string;
  error?: string;
}

interface Props {
  onImport: (rows: Omit<Holding, "id">[]) => void;
}

function parseCsv(text: string): ParsedRow[] {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return [];
  const header = lines[0].toLowerCase().split(",").map((s) => s.trim());
  const idxInstrument = header.indexOf("instrument_id");
  const idxAmount = header.indexOf("amount");
  const idxCost = header.indexOf("avg_cost");
  if (idxInstrument < 0 || idxAmount < 0 || idxCost < 0) {
    return [{ instrument_id: "", amount: "", avg_cost: "", error: "Header phải có instrument_id,amount,avg_cost" }];
  }
  const rows: ParsedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((s) => s.trim());
    const instrument_id = cols[idxInstrument] ?? "";
    const amount = cols[idxAmount] ?? "";
    const avg_cost = cols[idxCost] ?? "";
    let error: string | undefined;
    if (!instrument_id) error = "Thiếu instrument_id";
    else if (!Number.isFinite(parseFloat(amount)) || parseFloat(amount) <= 0) error = "Số lượng không hợp lệ";
    else if (!Number.isFinite(parseFloat(avg_cost)) || parseFloat(avg_cost) < 0) error = "Giá vốn không hợp lệ";
    rows.push({ instrument_id, amount, avg_cost, error });
  }
  return rows;
}

export function CsvImport({ onImport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setRows(parseCsv(text));
    };
    reader.readAsText(file);
  }

  const validRows = rows.filter((r) => !r.error);
  const hasErrors = rows.some((r) => r.error);

  function handleConfirm() {
    if (validRows.length === 0 || hasErrors) return;
    onImport(validRows.map((r) => ({ instrument_id: r.instrument_id, amount: r.amount, avg_cost: r.avg_cost })));
    setRows([]);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleCancel() {
    setRows([]);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="panel grid gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFile}
          className="text-sm"
        />
        {fileName && <span className="text-xs text-muted-foreground">{fileName}</span>}
      </div>

      {rows.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Tài sản</th>
                  <th className="px-3 py-2">Số lượng</th>
                  <th className="px-3 py-2">Giá vốn</th>
                  <th className="px-3 py-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-3 py-2 font-mono">{r.instrument_id || "—"}</td>
                    <td className="px-3 py-2 font-mono">{r.amount || "—"}</td>
                    <td className="px-3 py-2 font-mono">{r.avg_cost || "—"}</td>
                    <td className={`px-3 py-2 text-xs ${r.error ? "text-destructive" : "text-primary"}`}>
                      {r.error ?? "OK"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={validRows.length === 0 || hasErrors}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              Nhập {validRows.length} dòng
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-secondary"
            >
              Hủy
            </button>
          </div>
          {hasErrors && (
            <p className="text-sm text-destructive">
              Có lỗi trong CSV. Sửa file rồi thử lại.
            </p>
          )}
        </>
      )}
    </div>
  );
}

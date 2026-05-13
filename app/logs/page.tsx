"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import LogTable from "@/components/LogTable";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { LogEntry } from "@/lib/types";

const ENDPOINTS = [
  "전체",
  "/chat",
  "/auth/login",
  "/titanic/data",
  "/titanic/count",
  "/titanic/model",
  "/db-check",
];

export default function LogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [endpoint, setEndpoint] = useState("전체");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.logs({
        endpoint: endpoint === "전체" ? undefined : endpoint,
        from: from || undefined,
        to: to || undefined,
      });
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, from, to]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    load();
  }, [load, router]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(load, 10_000);
    return () => clearInterval(id);
  }, [autoRefresh, load]);

  return (
    <main className="px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-ink">API 로그</h1>
          <p className="text-muted text-sm mt-1">백엔드로 들어온 요청 기록을 확인합니다.</p>
        </header>

        <div className="bg-white border border-border rounded-2xl p-4 mb-6 shadow-soft">
          <div className="grid sm:grid-cols-4 gap-3">
            <Field label="엔드포인트">
              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-canvas/50 outline-none"
              >
                {ENDPOINTS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="시작">
              <input
                type="datetime-local"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-canvas/50 outline-none"
              />
            </Field>
            <Field label="종료">
              <input
                type="datetime-local"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-canvas/50 outline-none"
              />
            </Field>
            <div className="flex items-end gap-2">
              <button
                onClick={load}
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition disabled:opacity-60"
              >
                {loading ? "불러오는 중..." : "새로고침"}
              </button>
            </div>
          </div>
          <label className="mt-3 inline-flex items-center gap-2 text-sm text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="accent-accent"
            />
            10초마다 자동 새로고침
          </label>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {error} — 백엔드 <code>GET /logs</code> 엔드포인트가 필요합니다.
          </div>
        )}

        <LogTable logs={logs} />
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted block mb-1">{label}</span>
      {children}
    </label>
  );
}

"use client";

import { Fragment, useState } from "react";
import type { LogEntry } from "@/lib/types";

export default function LogTable({ logs }: { logs: LogEntry[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (logs.length === 0) {
    return (
      <div className="text-center text-muted py-16 bg-white rounded-2xl border border-border">
        표시할 로그가 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-canvas text-muted">
          <tr>
            <th className="text-left px-4 py-3 font-medium">시각</th>
            <th className="text-left px-4 py-3 font-medium">메서드</th>
            <th className="text-left px-4 py-3 font-medium">엔드포인트</th>
            <th className="text-left px-4 py-3 font-medium">상태</th>
            <th className="text-right px-4 py-3 font-medium">응답시간</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const open = openId === log.id;
            return (
              <Fragment key={log.id}>
                <tr
                  onClick={() => setOpenId(open ? null : log.id)}
                  className="border-t border-border cursor-pointer hover:bg-canvas/60 transition"
                >
                  <td className="px-4 py-3 text-ink whitespace-nowrap">
                    {formatTime(log.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-canvas text-ink text-xs font-medium">
                      {log.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink font-mono text-xs">{log.endpoint}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted">{log.duration_ms}ms</td>
                </tr>
                {open && (
                  <tr className="border-t border-border bg-canvas/50">
                    <td colSpan={5} className="px-4 py-4">
                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <Block title="요청" data={log.request} />
                        <Block title="응답" data={log.response} />
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: number }) {
  const tone =
    status >= 500
      ? "bg-red-100 text-red-700"
      : status >= 400
        ? "bg-amber-100 text-amber-700"
        : "bg-emerald-100 text-emerald-700";
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${tone}`}>{status}</span>;
}

function Block({ title, data }: { title: string; data: unknown }) {
  return (
    <div>
      <div className="text-muted mb-1">{title}</div>
      <pre className="bg-white border border-border rounded-lg p-3 overflow-auto max-h-64 font-mono text-[11px] text-ink">
        {data ? JSON.stringify(data, null, 2) : "—"}
      </pre>
    </div>
  );
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ko-KR", { hour12: false });
  } catch {
    return iso;
  }
}

import { getToken } from "./auth";
import type { LogEntry, LoginResponse } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(
  path: string,
  init: RequestInit = {},
  withAuth = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  if (withAuth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "detail" in data
        ? String((data as { detail: unknown }).detail)
        : null) ?? `요청 실패 (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const api = {
  login: (email: string, password: string) =>
    request<LoginResponse>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) },
      false,
    ),

  chat: (message: string, sessionId: string) =>
    request<{ reply: string }>(
      "/chat",
      { method: "POST", body: JSON.stringify({ message, session_id: sessionId }) },
    ),

  logs: (params: { endpoint?: string; from?: string; to?: string } = {}) => {
    const search = new URLSearchParams();
    if (params.endpoint) search.set("endpoint", params.endpoint);
    if (params.from) search.set("from", params.from);
    if (params.to) search.set("to", params.to);
    const qs = search.toString();
    return request<LogEntry[]>(`/logs${qs ? `?${qs}` : ""}`);
  },

  titanic: {
    count: () => request<{ count: number }>("/titanic/count"),
    survived: () => request<{ survived: number }>("/titanic/count/survived"),
    dead: () => request<{ dead: number }>("/titanic/count/dead"),
    model: () => request<{ model: string; accuracy: number }>("/titanic/model"),
    tree: () => request<{ tree: string }>("/titanic/tree"),
  },

  dbCheck: () =>
    request<{ status: string; neon_time?: string; message?: string }>(
      "/db-check",
    ),
};

export { BASE_URL };

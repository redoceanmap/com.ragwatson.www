import { getToken } from "./auth";
import type { LoginResponse } from "./types";

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

  register: (email: string, password: string, name: string) =>
    request<LoginResponse>(
      "/auth/register",
      { method: "POST", body: JSON.stringify({ email, password, name }) },
      false,
    ),

  chat: (message: string, sessionId: string) =>
    request<{ reply?: string; error?: string }>(
      "/chat",
      { method: "POST", body: JSON.stringify({ message, session_id: sessionId }) },
    ),

  signup: (userId: string, password: string, nickname: string, email: string) =>
    request<{ message: string; userId: string; nickname: string; email: string }>(
      "/signup",
      { method: "POST", body: JSON.stringify({ userId, password, nickname, email }) },
      false,
    ),

  weather: (lat: number, lon: number) =>
    fetch(`/api/weather?lat=${lat}&lon=${lon}`).then((r) => r.json()) as Promise<{
      city?: string;
      temp?: number;
      feels_like?: number;
      description?: string;
      icon?: string;
      humidity?: number;
      error?: string;
    }>,

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

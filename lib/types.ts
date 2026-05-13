export type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  duration_ms: number;
  request?: unknown;
  response?: unknown;
}

export interface LoginResponse {
  access_token: string;
  email: string;
  name?: string;
}

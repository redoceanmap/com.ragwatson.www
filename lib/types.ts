export type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface LoginResponse {
  access_token: string;
  email: string;
  name?: string;
}

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { setSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.login(email, password);
      setSession(res.access_token, { email: res.email, name: res.name });
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했어요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] grid place-items-center px-6 py-12 overflow-hidden starfield">
      {/* 별들 */}
      <span className="absolute top-[12%] left-[15%] w-1 h-1 bg-star animate-twinkle" style={{ boxShadow: "0 0 6px #FFE873" }} />
      <span className="absolute top-[20%] right-[20%] w-1 h-1 bg-star animate-twinkle" style={{ animationDelay: "1s", boxShadow: "0 0 6px #FFE873" }} />
      <span className="absolute top-[70%] left-[8%] w-1 h-1 bg-star animate-twinkle" style={{ animationDelay: "0.5s", boxShadow: "0 0 6px #FFE873" }} />

      <div className="relative w-full max-w-md bg-hull border-4 border-accent shadow-pixel-lg">
        {/* 콘솔 헤더 */}
        <div className="bg-accent px-3 py-2 border-b-4 border-black flex items-center justify-between">
          <span className="pixel-text text-[10px] text-hull">▼ FIRST CLASS · CABIN</span>
          <span className="flex gap-1.5">
            <span className="w-3 h-3 bg-accent border-2 border-hull" />
            <span className="w-3 h-3 bg-accent border-2 border-hull" />
            <span className="w-3 h-3 bg-accent border-2 border-hull" />
          </span>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            {/* 포트홀 아이콘 */}
            <div className="relative w-16 h-16 rounded-full bg-accent border-4 border-black grid place-items-center mb-4 shadow-glow animate-flicker">
              <div className="w-8 h-8 rounded-full border-2 border-hull bg-hull/30" />
            </div>
            <h1 className="pixel-text text-sm sm:text-base text-accent text-shadow-pixel">SIGN IN</h1>
            <p className="text-sm text-muted mt-3">다시 만나서 반가워요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="이메일"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Field
              label="비밀번호"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            {error && (
              <div className="text-sm text-hull bg-glow border-4 border-black px-3 py-2 shadow-pixel-sm">
                ! {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 pixel-text text-xs bg-accent text-hull border-4 border-black shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "TRANSMITTING..." : "BOARD"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-muted">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="pixel-text text-[10px] text-accent hover:text-accent-hover">
              회원가입 →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

function Field({ label, type, value, onChange, placeholder, autoComplete, required }: FieldProps) {
  return (
    <label className="block">
      <span className="pixel-text text-[10px] text-accent mb-2 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full px-3 py-3 border-4 border-accent bg-night-deep text-ink placeholder:text-muted focus:bg-hull focus:border-glow outline-none transition"
      />
    </label>
  );
}

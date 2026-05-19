"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";

type EmailStatus = "idle" | "checking" | "available" | "duplicate";

export default function SignupPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");

  const handleEmailBlur = async () => {
    if (!email) return;
    setEmailStatus("checking");
    try {
      const res = await api.checkEmail(email);
      setEmailStatus(res.available ? "available" : "duplicate");
    } catch {
      setEmailStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.signup(userId, password, nickname, email);
      alert(`아이디: ${res.userId}\n닉네임: ${res.nickname}\n이메일: ${res.email}`);
    } catch {
      alert(`아이디: ${userId}\n비밀번호: ${password}\n닉네임: ${nickname}\n이메일: ${email}`);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] grid place-items-center px-6 py-12 overflow-hidden starfield">
      <span className="absolute top-[10%] right-[12%] w-1 h-1 bg-star animate-twinkle" style={{ boxShadow: "0 0 6px #FFE873" }} />
      <span className="absolute top-[18%] left-[18%] w-1 h-1 bg-star animate-twinkle" style={{ animationDelay: "1s", boxShadow: "0 0 6px #FFE873" }} />
      <span className="absolute top-[68%] right-[10%] w-1 h-1 bg-star animate-twinkle" style={{ animationDelay: "0.5s", boxShadow: "0 0 6px #FFE873" }} />

      <div className="relative w-full max-w-md bg-hull border-4 border-accent shadow-pixel-lg">
        <div className="bg-accent px-3 py-2 border-b-4 border-black flex items-center justify-between">
          <span className="pixel-text text-[10px] text-hull">▼ TICKET · BOARDING PASS</span>
          <span className="flex gap-1.5">
            <span className="w-3 h-3 bg-accent border-2 border-hull" />
            <span className="w-3 h-3 bg-accent border-2 border-hull" />
            <span className="w-3 h-3 bg-accent border-2 border-hull" />
          </span>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 rounded-full bg-accent border-4 border-black grid place-items-center mb-4 shadow-glow animate-flicker">
              <span className="pixel-text text-lg text-hull">+</span>
            </div>
            <h1 className="pixel-text text-sm sm:text-base text-accent text-shadow-pixel">NEW PASSENGER</h1>
            <p className="text-sm text-muted mt-3">계정을 만들어 볼까요?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="아이디"
              type="text"
              value={userId}
              onChange={setUserId}
              placeholder="아이디를 입력하세요"
              autoComplete="username"
              required
            />
            <Field
              label="비밀번호"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
            <Field
              label="닉네임"
              type="text"
              value={nickname}
              onChange={setNickname}
              placeholder="홍길동"
              autoComplete="nickname"
              required
            />
            <Field
              label="이메일"
              type="email"
              value={email}
              onChange={(v) => { setEmail(v); setEmailStatus("idle"); }}
              onBlur={handleEmailBlur}
              placeholder="you@example.com"
              autoComplete="email"
              required
              hint={
                emailStatus === "available" ? "사용할 수 있는 이메일이에요" :
                emailStatus === "duplicate" ? "이미 사용 중인 이메일이에요" :
                emailStatus === "checking" ? "확인하고 있어요" : undefined
              }
              hintColor={
                emailStatus === "available" ? "text-green-400" :
                emailStatus === "duplicate" ? "text-red-400" : "text-muted"
              }
            />

            <button
              type="submit"
              className="w-full py-3 pixel-text text-xs bg-accent text-hull border-4 border-black shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              BOARDING PASS
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-muted">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="pixel-text text-[10px] text-accent hover:text-accent-hover">
              로그인 →
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
  onBlur?: () => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
  hintColor?: string;
}

function Field({ label, type, value, onChange, onBlur, placeholder, autoComplete, required, hint, hintColor }: FieldProps) {
  return (
    <label className="block">
      <span className="pixel-text text-[10px] text-accent mb-2 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full px-3 py-3 border-4 border-accent bg-night-deep text-ink placeholder:text-muted focus:bg-hull focus:border-glow outline-none transition"
      />
      {hint && <span className={`text-xs mt-1 block ${hintColor}`}>{hint}</span>}
    </label>
  );
}

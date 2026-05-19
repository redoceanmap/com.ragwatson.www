"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";
import { setSession } from "@/lib/auth";

type Mode = "login" | "signup";
type EmailStatus = "idle" | "checking" | "available" | "duplicate";

type Props = {
  open: boolean;
  initialMode: Mode;
  onClose: () => void;
};

export function AuthModal({ open, initialMode, onClose }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [mounted, setMounted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email) return;
    setEmailStatus("checking");
    try {
      const res = await api.checkEmail(email);
      setEmailStatus(res.available ? "available" : "duplicate");
    } catch {
      setEmailStatus("idle");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) { setMode(initialMode); setEmailStatus("idle"); }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const isLogin = mode === "login";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative flex min-h-full items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-md rounded-3xl bg-white p-7 sm:p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.2)] border border-[#E5E8EB]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-1 rounded-full bg-[#F2F4F6] p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={[
                  "rounded-full px-4 py-1.5 text-sm font-medium transition",
                  isLogin
                    ? "bg-white text-[#191F28] shadow-sm"
                    : "text-[#8B95A1] hover:text-[#4E5968]",
                ].join(" ")}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={[
                  "rounded-full px-4 py-1.5 text-sm font-medium transition",
                  !isLogin
                    ? "bg-white text-[#191F28] shadow-sm"
                    : "text-[#8B95A1] hover:text-[#4E5968]",
                ].join(" ")}
              >
                회원가입
              </button>
            </div>
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#8B95A1] hover:bg-[#F2F4F6] hover:text-[#191F28] transition"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-[#191F28]">
            {isLogin ? "다시 만나서 반가워요" : "계정을 만들어 볼까요?"}
          </h2>
          <p className="mt-2 text-sm text-[#4E5968]">
            {isLogin
              ? "이메일과 비밀번호가 필요해요"
              : "몇 가지만 입력하면 돼요"}
          </p>

          <form
            className="mt-6 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const password = String(fd.get("password") ?? "");
              const email = String(fd.get("email") ?? "");

              if (isLogin) {
                try {
                  const res = await api.login(email, password);
                  setSession(res.access_token, { email: res.email, name: res.name });
                  onClose();
                } catch {
                  alert("로그인에 실패했어요");
                }
                return;
              }

              const userId = String(fd.get("userId") ?? "");
              const nickname = String(fd.get("nickname") ?? "");
              try {
                const res = await api.signup(userId, password, nickname, email);
                alert(`아이디: ${res.userId}\n닉네임: ${res.nickname}\n이메일: ${res.email}`);
              } catch {
                alert(`아이디: ${userId}\n비밀번호: ${password}\n닉네임: ${nickname}\n이메일: ${email}`);
              }
            }}
          >
            {!isLogin ? (
              <>
                <Field
                  label="아이디"
                  type="text"
                  name="userId"
                  placeholder="아이디를 입력하세요"
                  autoComplete="username"
                />
                <Field
                  label="비밀번호"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <Field
                  label="닉네임"
                  type="text"
                  name="nickname"
                  placeholder="홍길동"
                  autoComplete="nickname"
                />
                <Field
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  onBlur={handleEmailBlur}
                  onChange={() => setEmailStatus("idle")}
                  hint={
                    emailStatus === "available" ? "사용할 수 있는 이메일이에요" :
                      emailStatus === "duplicate" ? "이미 사용 중인 이메일이에요" :
                        emailStatus === "checking" ? "확인하고 있어요" : undefined
                  }
                  hintColor={
                    emailStatus === "available" ? "text-emerald-600" :
                      emailStatus === "duplicate" ? "text-[#BE123C]" : "text-[#8B95A1]"
                  }
                />
              </>
            ) : (
              <>
                <Field
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <Field
                  label="비밀번호"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </>
            )}

            {isLogin && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#4E5968]">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-[#D1D6DB] accent-[#BE123C]"
                  />
                  로그인 상태 유지
                </label>
                <button
                  type="button"
                  className="text-xs text-[#8B95A1] hover:text-[#4E5968] transition"
                >
                  비밀번호 찾기
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-3 w-full rounded-full bg-[#BE123C] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9F1239] transition shadow-[0_4px_16px_-4px_rgba(190,18,60,0.35)]"
            >
              {isLogin ? "로그인" : "가입하기"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-[#8B95A1]">
            {isLogin ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isLogin ? "signup" : "login")}
              className="text-[#BE123C] font-medium hover:underline"
            >
              {isLogin ? "회원가입" : "로그인"}
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  hint,
  hintColor,
  ...rest
}: { label: string; hint?: string; hintColor?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[#4E5968]">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-[#E5E8EB] bg-[#F8F9FA] px-3.5 py-3 text-sm text-[#191F28] placeholder:text-[#8B95A1] outline-none transition focus:border-[#BE123C] focus:bg-white"
      />
      {hint && <span className={`mt-1.5 block text-xs ${hintColor}`}>{hint}</span>}
    </label>
  );
}

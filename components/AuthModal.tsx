"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";

type Mode = "login" | "signup";

type Props = {
  open: boolean;
  initialMode: Mode;
  onClose: () => void;
};

export function AuthModal({ open, initialMode, onClose }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setMode(initialMode);
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
      <div className="glass-surface glass-highlight relative w-full max-w-md rounded-3xl p-7 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={[
                "rounded-full px-4 py-1.5 text-sm transition",
                isLogin
                  ? "bg-white/15 text-white"
                  : "text-white/55 hover:text-white",
              ].join(" ")}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={[
                "rounded-full px-4 py-1.5 text-sm transition",
                !isLogin
                  ? "bg-white/15 text-white"
                  : "text-white/55 hover:text-white",
              ].join(" ")}
            >
              회원가입
            </button>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/[0.08] hover:text-white transition"
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

        <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
          {isLogin ? "다시 오신 것을 환영합니다" : "계정을 만들어 시작하세요"}
        </h2>
        <p className="mt-1.5 text-sm text-white/55">
          {isLogin
            ? "이메일과 비밀번호로 로그인하세요."
            : "몇 가지 정보만 입력하면 됩니다."}
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (isLogin) return;
            const fd = new FormData(e.currentTarget);
            const userId = String(fd.get("userId") ?? "");
            const password = String(fd.get("password") ?? "");
            const nickname = String(fd.get("nickname") ?? "");
            const email = String(fd.get("email") ?? "");
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
              <label className="flex items-center gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.06]"
                />
                로그인 상태 유지
              </label>
              <button
                type="button"
                className="text-xs text-white/60 hover:text-white transition"
              >
                비밀번호 찾기
              </button>
            </div>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-full border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition"
          >
            {isLogin ? "로그인" : "가입하기"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-white/55">
          {isLogin ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
          <button
            type="button"
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="text-white hover:underline"
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
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-white/60">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/30 focus:bg-white/[0.07]"
      />
    </label>
  );
}

"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "AI 에이전트에게 질문하기",
  autoFocus,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const submit = () => {
    if (disabled) return;
    if (!value.trim()) return;
    onSubmit();
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-card border border-border px-5 py-4">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent outline-none text-ink placeholder:text-muted text-base leading-6"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted text-sm">
          <button
            type="button"
            className="w-8 h-8 grid place-items-center rounded-full hover:bg-gray-100 transition"
            aria-label="첨부"
          >
            +
          </button>
          <span className="hidden sm:inline">Enter로 전송 · Shift+Enter 줄바꿈</span>
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="w-9 h-9 grid place-items-center rounded-full bg-accent text-white disabled:bg-gray-200 disabled:text-gray-400 hover:bg-accent-hover transition"
          aria-label="전송"
        >
          ↑
        </button>
      </div>
    </div>
  );
}

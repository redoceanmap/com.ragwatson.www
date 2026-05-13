"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ChatBubble, { TypingBubble } from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import QuickChips from "@/components/QuickChips";
import { api } from "@/lib/api";
import { displayName, getProfile, getToken, type Profile } from "@/lib/auth";
import type { ChatMessage } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessionId = useMemo(
    () => (typeof crypto !== "undefined" ? crypto.randomUUID() : String(Date.now())),
    [],
  );

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    setProfile(getProfile());
  }, [router]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await api.chat(text, sessionId);
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: res.reply,
        createdAt: Date.now(),
      };
      setMessages((m) => [...m, aiMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: `e-${Date.now()}`,
        role: "assistant",
        content: `⚠️ 응답을 받지 못했습니다.\n\n\`${err instanceof Error ? err.message : "알 수 없는 오류"}\`\n\n백엔드 \`POST /chat\` 엔드포인트가 준비되어 있는지 확인하세요.`,
        createdAt: Date.now(),
      };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setSending(false);
    }
  };

  const hasConversation = messages.length > 0;
  const name = displayName(profile);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {!hasConversation ? (
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <p className="text-muted text-lg">{name}님, 안녕하세요</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-ink mt-1 mb-8">
              무엇을 도와드릴까요?
            </h1>
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={send}
              disabled={sending}
              autoFocus
            />
            <QuickChips onPick={(p) => setInput(p)} />
          </div>
        </section>
      ) : (
        <>
          <section
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-8"
          >
            <div className="mx-auto max-w-2xl">
              {messages.map((m) => (
                <ChatBubble key={m.id} msg={m} />
              ))}
              {sending && <TypingBubble />}
            </div>
          </section>
          <div className="sticky bottom-0 bg-canvas/90 backdrop-blur border-t border-border px-6 py-4">
            <div className="mx-auto max-w-2xl">
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={send}
                disabled={sending}
                autoFocus
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

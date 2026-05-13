"use client";

import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "@/lib/types";

export default function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-6 ${
          isUser
            ? "bg-accent text-white rounded-br-md"
            : "bg-white text-ink border border-border rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{msg.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-2 prose-pre:bg-canvas">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex justify-start mb-3">
      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-border">
        <span className="inline-flex gap-1">
          <Dot delay="0s" />
          <Dot delay="0.15s" />
          <Dot delay="0.3s" />
        </span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="w-2 h-2 rounded-full bg-muted/60 inline-block animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}

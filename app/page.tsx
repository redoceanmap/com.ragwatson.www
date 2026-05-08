"use client";

import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from "react";
import { Send, RefreshCw, Loader2, Database, MessageCircle } from "lucide-react";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

interface Message {
  role: "user" | "assistant";
  text: string;
  ts: string;
  confidence?: number;
  sources?: string[];
}

interface TitanicDataRow {
  [key: string]: string | number | boolean | null;
}

type ViewType = "qa" | "sample";

export default function TitanicQaApp() {
  const [currentView, setCurrentView] = useState<ViewType>("qa");

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Navigation */}
        <nav className="flex gap-2 mb-6" role="navigation" aria-label="메인 탐색">
          <button
            type="button"
            onClick={() => setCurrentView("qa")}
            aria-pressed={currentView === "qa"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
              ${
                currentView === "qa"
                  ? "border-zinc-400 bg-zinc-100 text-zinc-900 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            QA 채팅
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("sample")}
            aria-pressed={currentView === "sample"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
              ${
                currentView === "sample"
                  ? "border-zinc-400 bg-zinc-100 text-zinc-900 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
          >
            <Database size={16} aria-hidden="true" />
            샘플 데이터
          </button>
        </nav>

        {currentView === "qa" ? <TitanicQAPage /> : <TitanicSampleDataPage />}
      </div>
    </main>
  );
}

function TitanicQAPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendQuestion = async (question: string) => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: question,
      ts: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLastQuestion(question);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${apiBaseUrl}/titanic/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data: { answer: string; confidence: number; sources: string[] } =
        await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        text: data.answer,
        ts: new Date().toISOString(),
        confidence: data.confidence,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const question = input.trim();
    setInput("");
    sendQuestion(question);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      const question = input.trim();
      setInput("");
      sendQuestion(question);
    }
  };

  const handleRetry = () => {
    if (lastQuestion) {
      setErrorMessage(null);
      sendQuestion(lastQuestion);
    }
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Titanic QA Assistant
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          타이타닉 데이터 기반 질의응답
        </p>
      </header>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1"
        role="log"
        aria-label="대화 내역"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
            <p>질문을 입력하여 대화를 시작하세요.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={`${msg.ts}-${idx}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.text}</p>

              {msg.role === "assistant" && msg.confidence !== undefined && (
                <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700 text-xs">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    신뢰도: {(msg.confidence * 100).toFixed(1)}%
                  </p>
                  {msg.sources && msg.sources.length > 0 && (
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                      출처: {msg.sources.join(", ")}
                    </p>
                  )}
                </div>
              )}

              <p
                className={`text-xs mt-2 ${
                  msg.role === "user"
                    ? "text-zinc-300 dark:text-zinc-600"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {formatTimestamp(msg.ts)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-3">
              <Loader2
                className="animate-spin text-zinc-500 dark:text-zinc-400"
                size={20}
                aria-label="응답 로딩 중"
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {errorMessage && (
        <div
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between"
          role="alert"
        >
          <p className="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
          <button
            type="button"
            onClick={handleRetry}
            aria-label="재시도"
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 dark:border-red-700 bg-white dark:bg-zinc-900 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            <RefreshCw size={14} aria-hidden="true" />
            재시도
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1">
          <label htmlFor="question-input" className="sr-only">
            질문 입력
          </label>
          <textarea
            ref={textareaRef}
            id="question-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예: 25세 남성 3등석 생존 가능성은?"
            maxLength={500}
            rows={2}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500 disabled:opacity-50 transition-colors"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 text-right">
            {input.length}/500
          </p>
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="질문 전송"
          className="flex-shrink-0 p-3 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

function TitanicSampleDataPage() {
  const [data, setData] = useState<TitanicDataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${apiBaseUrl}/titanic/data`);

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result: TitanicDataRow[] = await response.json();
      setData(result);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatValue = (value: string | number | boolean | null): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "예" : "아니오";
    return String(value);
  };

  return (
    <div>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          샘플 데이터
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          타이타닉 데이터셋 샘플
        </p>
      </header>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2
            className="animate-spin text-zinc-500 dark:text-zinc-400"
            size={32}
            aria-label="데이터 로딩 중"
          />
        </div>
      )}

      {/* Error */}
      {errorMessage && (
        <div
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between"
          role="alert"
        >
          <p className="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
          <button
            type="button"
            onClick={fetchData}
            aria-label="다시 불러오기"
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-300 dark:border-red-700 bg-white dark:bg-zinc-900 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            <RefreshCw size={14} aria-hidden="true" />
            다시 불러오기
          </button>
        </div>
      )}

      {/* Data Cards */}
      {!isLoading && !errorMessage && data.length === 0 && (
        <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
          <p>데이터가 없습니다.</p>
        </div>
      )}

      <div className="space-y-4">
        {data.map((row, idx) => (
          <article
            key={idx}
            className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 bg-white dark:bg-zinc-800"
          >
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
              승객 #{idx + 1}
            </h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {Object.entries(row).map(([key, value]) => (
                <div key={key} className="contents">
                  <dt className="text-zinc-500 dark:text-zinc-400 font-medium">
                    {key}
                  </dt>
                  <dd className="text-zinc-900 dark:text-zinc-100">
                    {formatValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      {/* Refresh Button */}
      {!isLoading && data.length > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={fetchData}
            aria-label="데이터 새로고침"
            className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} aria-hidden="true" />
            새로고침
          </button>
        </div>
      )}
    </div>
  );
}

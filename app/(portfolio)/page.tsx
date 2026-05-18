"use client";

import { useEffect, useState } from "react";
import { GlassButton } from "@/components/GlassButton";
import { GlassCard } from "@/components/GlassCard";
import { api } from "@/lib/api";

type Weather = {
  city?: string;
  temp?: number;
  feels_like?: number;
  description?: string;
  icon?: string;
  humidity?: number;
  error?: string;
};

const projects = [
  {
    href: "/titanic",
    tag: "Learning",
    title: "Titanic Survival Analysis",
    desc: "Kaggle 타이타닉 데이터셋으로 진행한 학습용 ML 파이프라인. 전처리·EDA·모델링까지의 흐름을 정리했습니다.",
  },
  {
    href: "/projects/redoceanmap",
    tag: "Personal",
    title: "RedOceanMap",
    desc: "레드오션 시장을 시각적으로 매핑하는 개인 프로젝트. 현재 설계 단계, 곧 업데이트됩니다.",
  },
];

const skills = [
  "TypeScript",
  "React / Next.js",
  "Python",
  "FastAPI",
  "Tailwind CSS",
  "PostgreSQL",
];

const DAYS_KR = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const pad2 = (n: number) => String(n).padStart(2, "0");

export default function HomePage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        api.weather(coords.latitude, coords.longitude)
          .then(setWeather)
          .catch(() => setWeather(null));
      },
      () => setWeather(null),
    );
  }, []);

  const handleSubmit = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setLoading(true);
    setReply("");
    try {
      const res = await api.chat(msg, "portfolio");
      setReply(res.reply ?? res.error ?? "");
    } catch (e) {
      setReply("오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="mx-auto w-[min(94%,1080px)] space-y-16 sm:space-y-24">
      {/* Hero */}
      <section className="pt-6 sm:pt-12">
        {weather && !weather.error && weather.temp !== undefined && (
          <div className="mb-6 glass-surface glass-highlight relative rounded-2xl px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center justify-between gap-4 sm:gap-8">
              <div className="flex flex-col">
                <div className="text-[10px] sm:text-xs text-white/65 tracking-wider">
                  {now
                    ? `${now.getFullYear()}.${pad2(now.getMonth() + 1)}.${pad2(now.getDate())} | ${DAYS_KR[now.getDay()]}`
                    : ""}
                </div>
                <div className="font-display text-2xl sm:text-4xl font-bold text-white tabular-nums leading-tight">
                  {now ? `${pad2(now.getHours())}:${pad2(now.getMinutes())}` : "--:--"}
                </div>
              </div>

              <div className="h-10 sm:h-12 w-px bg-white/15" />

              <div className="flex flex-col items-start min-w-[60px]">
                <div className="font-display text-2xl sm:text-3xl font-semibold text-white leading-none">
                  {Math.round(weather.temp)}°C
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-white/55">
                  체감온도 <span className="text-white/80">{Math.round(weather.feels_like ?? weather.temp)}°C</span>
                </div>
                <div className="text-[10px] sm:text-xs text-white/55">
                  습도 <span className="text-white/80">{weather.humidity}%</span>
                </div>
              </div>

              <div className="h-10 sm:h-12 w-px bg-white/15" />

              <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
                {weather.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description ?? ""}
                    className="h-12 w-12 sm:h-16 sm:w-16 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                  />
                )}
                <div className="flex flex-col items-end">
                  <div className="text-xs sm:text-sm text-white font-medium">
                    {weather.city}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/65">
                    {weather.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-2 glass-surface glass-highlight relative rounded-3xl px-5 py-4 sm:px-6 sm:py-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="AI에게 물어보기"
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder:text-white/40 outline-none"
          />
          <div className="mt-4 flex items-center justify-between text-white/70">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="추가"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:bg-white/[0.12]"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/[0.12]"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-3.5 w-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M3 6h8M3 14h6" />
                  <circle cx="14" cy="6" r="2" />
                  <circle cx="11" cy="14" r="2" />
                </svg>
                도구
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-white/70 transition hover:text-white"
              >
                빠른 모델
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-3.5 w-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="음성 입력"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:bg-white/[0.12]"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="8" y="3" width="4" height="9" rx="2" />
                  <path d="M5 10a5 5 0 0 0 10 0M10 15v3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                aria-label="보내기"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90 disabled:bg-white/30 disabled:text-black/50"
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 16V4M4 10l6-6 6 6" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {reply && (
          <div className="mt-4 glass-surface-soft rounded-2xl px-5 py-4 text-sm text-white/85 leading-relaxed whitespace-pre-wrap">
            {reply}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <GlassButton href="#projects" variant="primary">
            프로젝트 보기 →
          </GlassButton>
          <GlassButton href="#contact" variant="ghost">
            연락하기
          </GlassButton>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <SectionHeader eyebrow="About" title="짧은 소개" />
        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="md:col-span-2">
            <p className="text-white/80 leading-relaxed">
              데이터에서 인사이트를 끌어내고, 그 인사이트를 사람들이 실제로
              사용하는 제품으로 만들어내는 일에 흥미를 느낍니다. 학습용
              프로젝트(<span className="text-white">Titanic</span>)에서는 머신러닝
              기초를, 개인 프로젝트(<span className="text-white">RedOceanMap</span>)
              에서는 아이디어를 끝까지 다듬는 과정을 연습하고 있어요.
            </p>
            <p className="mt-4 text-white/55 text-sm">
              * placeholder 문구입니다. 추후 자기소개로 교체할 예정입니다.
            </p>
          </GlassCard>

          <GlassCard variant="soft">
            <h3 className="font-display text-sm uppercase tracking-[0.18em] text-white/55">
              Stack
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <SectionHeader eyebrow="Projects" title="진행 중인 프로젝트" />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <GlassCard key={p.href} className="group flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[11px] tracking-wider text-white/70">
                  {p.tag}
                </span>
                <span className="text-white/30 text-xs">→</span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">
                {p.desc}
              </p>
              <div className="mt-6">
                <GlassButton href={p.href} variant="ghost">
                  자세히 보기
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <SectionHeader eyebrow="Contact" title="이야기를 나눠요" />
        <GlassCard>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl text-white">
                새로운 협업이나 질문은 언제든 환영합니다.
              </p>
              <p className="mt-2 text-sm text-white/60">
                이메일로 가볍게 인사 남겨 주세요. 보통 하루 안에 답장드립니다.
              </p>
            </div>
            <div className="flex gap-3">
              <GlassButton
                href="mailto:jang971121@gmail.com"
                variant="primary"
                external
              >
                Email
              </GlassButton>
              <GlassButton href="https://github.com" variant="ghost" external>
                GitHub
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="font-display text-xs uppercase tracking-[0.22em] text-white/45">
        {eyebrow}
      </div>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

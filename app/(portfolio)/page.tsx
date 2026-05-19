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
    title: "Titanic",
    desc: "Kaggle 타이타닉 데이터셋으로 ML 파이프라인을 만들어 봤어요. 전처리부터 EDA, 모델링까지 흐름을 정리했어요.",
  },
  {
    href: "/projects/redoceanmap",
    tag: "Personal",
    title: "RedOceanMap",
    desc: "레드오션 시장을 한눈에 매핑해 주는 개인 프로젝트예요. 지금은 설계 단계라 곧 업데이트할게요.",
  },
];

type Learning = { icon: string; label: string; modules: string[] };

const learnings: Learning[] = [
  {
    icon: "🐍",
    label: "Python",
    modules: [
      "변수와 자료형",
      "조건문과 반복문",
      "함수 및 모듈",
      "파일 입출력",
      "객체 지향 프로그래밍",
      "예외 처리",
      "표준 라이브러리",
      "동기 프로그래밍 및 멀티쓰레딩",
    ],
  },
  {
    icon: "𝙅𝙎",
    label: "JavaScript",
    modules: [
      "자바스크립트 소개 및 설정",
      "기본 문법",
      "조건문과 반복문",
      "함수",
      "객체와 배열",
      "고급 함수",
      "이벤트와 이벤트 처리",
      "DOM 탐색 / 수정",
      "비동기 자바스크립트",
    ],
  },
  {
    icon: "🌿",
    label: "Git",
    modules: [
      "Git 기초 명령어",
      "브랜치와 병합",
      "원격 저장소 사용",
      "협업 워크플로우",
    ],
  },
  {
    icon: "⚛️",
    label: "React",
    modules: [
      "리액트 소개 및 기본 개념",
      "JSX와 컴포넌트",
      "Hooks",
      "이벤트 처리와 폼",
      "컴포넌트 스타일링",
      "라우팅",
      "상태 관리",
      "데이터 페칭",
    ],
  },
  {
    icon: "⚡",
    label: "FastAPI",
    modules: [
      "FastAPI 소개 및 환경 설정",
      "FastAPI 애플리케이션",
      "경로와 요청 처리",
      "응답(Response) 관리",
      "데이터 검증 및 직렬화",
      "종속성 주입 (DI)",
      "데이터베이스 연동",
      "인증 및 권한 관리",
      "미들웨어와 이벤트 처리",
      "RESTful API 설계",
    ],
  },
  {
    icon: "🗄️",
    label: "Database",
    modules: [
      "데이터베이스 개념 이해",
      "데이터 모델링 기법",
      "DBMS 종류",
      "트랜잭션 관리 및 동시성 제어",
      "SQL 구문 이해",
      "조인과 서브쿼리 활용",
      "데이터 집계 및 정렬",
      "데이터베이스 연동",
      "애플리케이션에서의 데이터 처리",
      "실시간 데이터베이스 운영",
    ],
  },
  {
    icon: "🧠",
    label: "Deep Learning",
    modules: [
      "머신러닝과 딥러닝",
      "신경망의 구조: 뉴런·가중치·활성화 함수",
      "단층 및 다층 퍼셉트론 설계",
      "PyTorch의 동적 계산 그래프와 자동 미분",
      "딥러닝 모델의 학습",
      "과적합 방지 전략",
      "경량화·양자화·프루닝",
      "모델 서빙 개념",
      "Nvidia Triton & TensorRT Inference 최적화",
      "모델 서빙 모니터링 및 성능 측정",
    ],
  },
  {
    icon: "🤖",
    label: "DL 심화",
    modules: [
      "컴퓨터 비전",
      "컨볼루션 신경망 (CNN)",
      "객체 탐지와 분할",
      "이미지 생성 모델",
      "자연어 처리",
      "순환 신경망 (RNN)과 LSTM",
      "트랜스포머 아키텍처",
      "자연어 생성과 번역",
      "멀티모달 학습",
      "전이학습과 파인튜닝",
    ],
  },
  {
    icon: "🐧",
    label: "Linux",
    modules: [
      "리눅스 이해 및 명령어",
      "리눅스 시스템 관리",
      "네트워크 설정 및 관리",
    ],
  },
  {
    icon: "🌐",
    label: "Network",
    modules: [
      "OSI 모델과 TCP/IP 프로토콜",
      "IP 주소 구조 및 서브넷팅",
      "DHCP / DNS",
      "라우팅 기본 동작",
    ],
  },
  {
    icon: "🐳",
    label: "Docker/K8s",
    modules: [
      "Docker 설치 및 기본 사용법",
      "이미지와 컨테이너 관리",
      "Docker Compose",
      "Docker Swarm",
      "Kubernetes 개념 및 아키텍처",
      "클러스터 설정",
      "파드·서비스·디플로이먼트",
      "RedHat OpenShift 기반 컨테이너 오케스트레이션",
    ],
  },
  {
    icon: "☁️",
    label: "AWS",
    modules: [
      "아키텍팅 기본 사항",
      "계정 보안",
      "네트워킹",
      "컴퓨팅",
      "스토리지",
      "데이터베이스 서비스",
      "모니터링 및 스케일링",
      "자동화",
      "서버리스 아키텍처",
      "엣지 서비스",
    ],
  },
  {
    icon: "💎",
    label: "Watsonx.ai",
    modules: [
      "AI 비즈니스 플랫폼 IBM Watsonx",
      "프롬프트 엔지니어링 (w/Lab)",
      "IBM Python SDK 및 Langchain (w/Lab)",
      "Retrieval Augmented Generation (w/Lab)",
      "Watsonx Assistant·Discovery 기반 RAG",
      "Watsonx.ai 생성형 AI 활용 사례 데모",
    ],
  },
  {
    icon: "🚀",
    label: "AI 프로젝트",
    modules: [
      "LLM · Finance 소비 분석 서비스",
      "LLM · Call Center 업무 자동화",
      "LLM · Customer Reviews 감정 / Insight 도출",
      "LMM · AI 음성 인식 및 대화 분석",
      "LMM · Image&Text 제품 검색 및 추천",
    ],
  },
];

const DAYS_KR = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const pad2 = (n: number) => String(n).padStart(2, "0");

export default function HomePage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [selectedLearning, setSelectedLearning] = useState(0);

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
    } catch {
      setReply("문제가 생겼어요. 다시 시도해 주세요");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="mx-auto w-[min(94%,1080px)]">
      {/* Hero — 큰 타이포 */}
      <section className="pt-12 sm:pt-24 pb-24 sm:pb-40">
        {weather && !weather.error && weather.temp !== undefined && (
          <div className="mb-10 glass-surface relative rounded-2xl px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center justify-between gap-4 sm:gap-8">
              <div className="flex flex-col">
                <div className="text-[10px] sm:text-xs text-[#8B95A1] tracking-wider">
                  {now
                    ? `${now.getFullYear()}.${pad2(now.getMonth() + 1)}.${pad2(now.getDate())} | ${DAYS_KR[now.getDay()]}`
                    : ""}
                </div>
                <div className="font-display text-2xl sm:text-4xl font-bold text-[#191F28] tabular-nums leading-tight">
                  {now ? `${pad2(now.getHours())}:${pad2(now.getMinutes())}` : "--:--"}
                </div>
              </div>

              <div className="h-10 sm:h-12 w-px bg-[#E5E8EB]" />

              <div className="flex flex-col items-start min-w-[60px]">
                <div className="font-display text-2xl sm:text-3xl font-semibold text-[#191F28] leading-none">
                  {Math.round(weather.temp)}°C
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-[#8B95A1]">
                  체감온도 <span className="text-[#4E5968]">{Math.round(weather.feels_like ?? weather.temp)}°C</span>
                </div>
                <div className="text-[10px] sm:text-xs text-[#8B95A1]">
                  습도 <span className="text-[#4E5968]">{weather.humidity}%</span>
                </div>
              </div>

              <div className="h-10 sm:h-12 w-px bg-[#E5E8EB]" />

              <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
                {weather.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description ?? ""}
                    className="h-12 w-12 sm:h-16 sm:w-16"
                  />
                )}
                <div className="flex flex-col items-end">
                  <div className="text-xs sm:text-sm text-[#191F28] font-medium">
                    {weather.city}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#8B95A1]">
                    {weather.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF1F2] border border-[#FECDD3] px-3 py-1 text-xs font-medium text-[#BE123C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C]" />
          Developer Portfolio
        </div>

        <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#191F28] leading-[1.05] text-balance">
          <br />
          <span className="text-[#BE123C]"></span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg sm:text-xl text-[#4E5968] leading-relaxed">
          학습 프로젝트와 개인 프로젝트로 ML과 풀스택을 연습하고 있어요.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <GlassButton href="#projects" variant="primary">
            프로젝트 둘러보기
          </GlassButton>
          <GlassButton href="#contact" variant="ghost">
            연락하기
          </GlassButton>
        </div>

        {/* AI 챗 입력 */}
        <div className="mt-16 glass-surface relative rounded-3xl px-5 py-4 sm:px-6 sm:py-5">
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
            placeholder="무엇이 궁금하신가요?"
            className="w-full bg-transparent text-base sm:text-lg text-[#191F28] placeholder:text-[#8B95A1] outline-none"
          />
          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              aria-label="보내기"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BE123C] text-white transition hover:bg-[#9F1239] disabled:bg-[#E5E8EB] disabled:text-[#8B95A1]"
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

        {reply && (
          <div className="mt-4 glass-surface-soft rounded-2xl px-5 py-4 text-sm text-[#191F28] leading-relaxed whitespace-pre-wrap">
            {reply}
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="py-20 sm:py-32">
        <div className="font-display text-sm uppercase tracking-[0.22em] text-[#BE123C] font-semibold">
          About
        </div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#191F28] text-balance leading-[1.15]">
          아이디어를 다듬어요<br />
        </h2>
        <GlassCard className="mt-12">
          <p className="text-[#4E5968] text-lg leading-relaxed">
            학습용 프로젝트(<span className="text-[#191F28] font-medium">Titanic</span>)에서는 머신러닝
            기초를, 개인 프로젝트(<span className="text-[#BE123C] font-medium">RedOceanMap</span>)
            에서는 실전 프로젝트를 진행 중이에요.
          </p>
          <p className="mt-6 text-[#8B95A1] text-sm">
            * placeholder 문구예요. 자기소개는 곧 채워 둘게요.
          </p>
        </GlassCard>
      </section>

      {/* Learning — IBM x RedHat AX Academy */}
      <section id="learning" className="py-20 sm:py-32">
        <div className="font-display text-sm uppercase tracking-[0.22em] text-[#BE123C] font-semibold">
          Learning
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#FFF1F2] border border-[#FECDD3] px-3 py-1 text-xs font-medium text-[#BE123C]">
          IBM × RedHat · AI Transformation
        </div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#191F28] text-balance leading-[1.15]">
          AX Academy에서<br />이런 걸 배웠어요
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#4E5968] leading-relaxed">
          풀스택 기초부터 생성형 AI까지 한 흐름으로 익혔어요.
        </p>

        {/* Apple Store-style horizontal scroller */}
        <div className="mt-12 -mx-4 sm:-mx-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:gap-3 min-w-max px-4 sm:px-6 pb-3">
            {learnings.map((l, i) => {
              const active = selectedLearning === i;
              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => setSelectedLearning(i)}
                  className={[
                    "flex flex-col items-center justify-center gap-3 rounded-2xl border transition-all min-w-[96px] sm:min-w-[112px] py-5 px-3",
                    active
                      ? "bg-[#FFF1F2] border-[#FECDD3] shadow-[0_4px_16px_-6px_rgba(190,18,60,0.25)]"
                      : "bg-white border-[#E5E8EB] hover:border-[#FECDD3] hover:bg-[#FFFAFB]",
                  ].join(" ")}
                >
                  <span className="text-3xl sm:text-4xl leading-none">
                    {l.icon}
                  </span>
                  <span
                    className={[
                      "text-xs sm:text-sm font-medium tracking-tight",
                      active ? "text-[#BE123C]" : "text-[#4E5968]",
                    ].join(" ")}
                  >
                    {l.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected category detail */}
        <div className="mt-6 rounded-3xl bg-white border border-[#E5E8EB] p-7 sm:p-10 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl leading-none">
              {learnings[selectedLearning].icon}
            </span>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#191F28] tracking-tight">
                {learnings[selectedLearning].label}
              </h3>
              <p className="mt-1 text-sm text-[#8B95A1]">
                {learnings[selectedLearning].modules.length}개의 모듈을 학습했어요
              </p>
            </div>
          </div>
          <ul className="mt-8 grid gap-y-3 gap-x-8 sm:grid-cols-2">
            {learnings[selectedLearning].modules.map((m) => (
              <li
                key={m}
                className="flex items-start gap-2 text-[#4E5968] leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#BE123C] flex-none" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 sm:py-32">
        <div className="font-display text-sm uppercase tracking-[0.22em] text-[#BE123C] font-semibold">
          Projects
        </div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#191F28] text-balance leading-[1.15]">
          지금 만들고<br />있는 것들이에요
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <GlassCard key={p.href} className="group flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-[#FFF1F2] border border-[#FECDD3] px-2.5 py-0.5 text-[11px] tracking-wider text-[#BE123C] font-medium">
                  {p.tag}
                </span>
                <span className="text-[#C4CCD3] text-xs">→</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#191F28]">
                {p.title}
              </h3>
              <p className="mt-4 text-[#4E5968] leading-relaxed flex-1">
                {p.desc}
              </p>
              <div className="mt-8">
                <GlassButton href={p.href} variant="ghost">
                  자세히 보기
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-32">
        <div className="font-display text-sm uppercase tracking-[0.22em] text-[#BE123C] font-semibold">
          Contact
        </div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#191F28] text-balance leading-[1.15]">
          이야기를<br />나눠 봐요
        </h2>
        <GlassCard className="mt-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl sm:text-2xl font-semibold text-[#191F28]">
                새로운 협업이나 질문은 언제든 환영해요
              </p>
              <p className="mt-3 text-[#4E5968]">
                이메일로 가볍게 인사 남겨 주세요. 보통 하루 안에 답장드릴게요.
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

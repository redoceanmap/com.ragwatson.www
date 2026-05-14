import PixelTitanic from "@/components/PixelTitanic";
import PixelIceberg from "@/components/PixelIceberg";

const STARS = [
  { top: "8%", left: "12%", size: 4, delay: "0s" },
  { top: "14%", left: "78%", size: 3, delay: "0.5s" },
  { top: "20%", left: "30%", size: 4, delay: "1s" },
  { top: "10%", left: "55%", size: 3, delay: "1.5s" },
  { top: "26%", left: "88%", size: 4, delay: "0.3s" },
  { top: "32%", left: "8%", size: 3, delay: "0.8s" },
  { top: "18%", left: "42%", size: 2, delay: "1.2s" },
  { top: "30%", left: "65%", size: 3, delay: "0.6s" },
  { top: "12%", left: "20%", size: 2, delay: "1.8s" },
  { top: "24%", left: "70%", size: 2, delay: "0.2s" },
];

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden starfield">
      {/* 깜빡이는 별들 */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute bg-star animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            boxShadow: "0 0 6px rgba(255,232,115,0.8)",
          }}
        />
      ))}

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex flex-col items-center pt-20 pb-48 px-6">
        <h1 className="pixel-text text-5xl sm:text-7xl text-accent text-center leading-relaxed text-shadow-glow animate-flicker">
          TITANIC
        </h1>

        <div className="mt-6 px-4 py-2 bg-hull text-accent pixel-text text-[10px] sm:text-xs border-4 border-accent shadow-glow">
          ★ APRIL 14, 1912 ★
        </div>

        <p className="mt-6 text-muted text-sm sm:text-base text-center max-w-md">
          대화형 AI 에이전트 플랫폼
        </p>

        {/* 검색 박스 — 무선 통신실 콘솔 느낌 */}
        <div className="mt-10 w-full max-w-xl">
          <div className="bg-hull border-4 border-accent shadow-pixel-lg">
            <div className="bg-accent px-3 py-1 border-b-4 border-black">
              <span className="pixel-text text-[10px] text-hull">
                ▼ MARCONI WIRELESS
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="pixel-text text-xs text-accent cursor-blink">&gt;</span>
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="flex-1 bg-transparent outline-none text-ink placeholder:text-muted text-sm font-sans"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 pixel-text text-[10px] text-accent animate-twinkle-slow">
          - PRESS START -
        </p>
      </div>

      {/* 항해 + 침몰하는 타이타닉 (애니메이션) */}
      <div className="absolute bottom-24 left-0 right-0 h-32 z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 w-72 sm:w-[28rem] animate-sail-sink"
          style={{ left: 0, transformOrigin: "70% 80%" }}
        >
          <PixelTitanic className="w-full" />
        </div>
      </div>

      {/* 빙산 (2/3 지점, 충돌 위치) */}
      <div
        className="absolute bottom-28 w-16 sm:w-24 z-20 opacity-95 animate-iceberg-shake"
        style={{ left: "calc(66vw - 3rem)" }}
      >
        <PixelIceberg className="w-full" />
      </div>

      {/* 침몰 지점 물보라 */}
      <div
        className="absolute bottom-28 z-20 pointer-events-none animate-splash origin-bottom"
        style={{ left: "calc(66vw - 1.5rem)" }}
      >
        <div className="w-3 h-8 bg-ocean-foam mb-1 inline-block mx-0.5" />
        <div className="w-3 h-12 bg-ocean-foam mb-1 inline-block mx-0.5" />
        <div className="w-3 h-6 bg-ocean-foam mb-1 inline-block mx-0.5" />
      </div>

      {/* 바다 (하단) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 moonlight-water border-t-4 border-black overflow-hidden">
        {/* 픽셀 파도 라인들 */}
        <div className="absolute inset-0 ocean opacity-60 animate-wave" />
        <div className="absolute top-2 left-0 right-0 h-1 bg-ocean-foam opacity-30" />
        <div className="absolute top-6 left-0 right-0 h-1 bg-ocean-foam opacity-20" />
      </div>
    </main>
  );
}

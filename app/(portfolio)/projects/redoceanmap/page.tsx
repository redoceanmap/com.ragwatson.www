import { GlassButton } from "@/components/GlassButton";
import { GlassCard } from "@/components/GlassCard";

export const metadata = {
  title: "RedOceanMap — jangminseok.dev",
};

export default function RedOceanMapPage() {
  return (
    <div className="mx-auto w-[min(94%,920px)] space-y-10">
      <header>
        <div className="font-display text-xs uppercase tracking-[0.22em] text-[#BE123C] font-semibold">
          Personal Project
        </div>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#191F28] text-balance leading-[1.1]">
          Red<span className="text-[#BE123C]">Ocean</span>Map
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#4E5968] leading-relaxed">
          포화된 시장에서 빈틈을 찾도록 도와주는 개인 프로젝트예요.
          지금은 설계 단계라 한 단계씩 다듬어 가고 있어요.
        </p>
      </header>

      <GlassCard>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF1F2] border border-[#FECDD3] px-3 py-1 text-xs font-medium text-[#BE123C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C]" />
          Coming soon
        </div>
        <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-[#191F28]">
          이 페이지는 곧 채워 져요
        </h2>
        <p className="mt-4 text-[#4E5968] leading-relaxed">
          프로젝트 구성중이라 곧 만들어질 페이지에요.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GlassButton href="/" variant="ghost">
            ← 메인으로
          </GlassButton>
          <GlassButton href="/titanic" variant="primary">
            다른 프로젝트 보기
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}

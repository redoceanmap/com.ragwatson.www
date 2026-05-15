import { GlassButton } from "@/components/GlassButton";
import { GlassCard } from "@/components/GlassCard";

export const metadata = {
  title: "RedOceanMap — jangminseok.dev",
};

export default function RedOceanMapPage() {
  return (
    <div className="mx-auto w-[min(94%,920px)] space-y-10">
      <header>
        <div className="font-display text-xs uppercase tracking-[0.22em] text-white/45">
          Personal Project
        </div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
          RedOceanMap
        </h1>
        <p className="mt-4 max-w-2xl text-white/65 leading-relaxed">
          포화된 시장을 시각적으로 매핑해, 그 안에서 비어 있는 틈을 발견하도록
          돕는 개인 프로젝트입니다. 현재는 설계 단계에 있습니다.
        </p>
      </header>

      <GlassCard>
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/10 border border-amber-300/30 px-3 py-1 text-xs text-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px] shadow-amber-300/70" />
          Coming soon
        </div>
        <h2 className="mt-5 font-display text-xl font-semibold text-white">
          이 페이지는 곧 업데이트됩니다.
        </h2>
        <p className="mt-3 text-white/65 leading-relaxed">
          기능 정의, 화면 설계, 진행 로그 등 프로젝트가 구체화되는 과정을
          순차적으로 기록할 예정이에요.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
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

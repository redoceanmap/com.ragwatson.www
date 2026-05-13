"use client";

interface Chip {
  icon: string;
  label: string;
  prompt: string;
}

const DEFAULT_CHIPS: Chip[] = [
  { icon: "📊", label: "타이타닉 데이터 보기", prompt: "타이타닉 데이터 샘플을 보여줘" },
  { icon: "💀", label: "생존자 통계", prompt: "타이타닉 생존자 수와 사망자 수를 알려줘" },
  { icon: "🌲", label: "모델 정보", prompt: "현재 학습된 모델 이름과 정확도를 알려줘" },
  { icon: "🩺", label: "DB 상태 확인", prompt: "데이터베이스 연결 상태를 확인해줘" },
];

interface Props {
  onPick: (prompt: string) => void;
  chips?: Chip[];
}

export default function QuickChips({ onPick, chips = DEFAULT_CHIPS }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {chips.map((c) => (
        <button
          key={c.label}
          onClick={() => onPick(c.prompt)}
          className="px-4 py-2 bg-white border border-border rounded-full text-sm text-ink shadow-soft hover:shadow-card transition"
        >
          <span className="mr-1">{c.icon}</span>
          {c.label}
        </button>
      ))}
    </div>
  );
}

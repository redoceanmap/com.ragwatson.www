/**
 * 타이타닉을 좌측(stern, 선미)과 우측(bow, 선수) 절반으로 잘라 그리는 컴포넌트.
 * 두 인스턴스를 같은 위치에 겹쳐서 합치면 원본 PixelTitanic과 동일.
 * 분리면(x=160)에 부서진 단면 + 화염 픽셀을 추가해 두 동강 난 모습을 표현.
 */
export default function PixelTitanicHalf({
  side,
  className = "",
}: {
  side: "stern" | "bow";
  className?: string;
}) {
  const clipId = `titanic-clip-${side}`;
  return (
    <svg
      viewBox="0 14 320 138"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          {side === "stern" ? (
            <rect x="0" y="14" width="160" height="138" />
          ) : (
            <rect x="160" y="14" width="160" height="138" />
          )}
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* 4개의 굴뚝 */}
        <Funnel x={100} />
        <Funnel x={140} />
        <Funnel x={180} />
        <Funnel x={220} />

        {/* 굴뚝 연기 */}
        <Smoke x={104} />
        <Smoke x={144} />
        <Smoke x={184} />

        {/* 상부 갑판 */}
        <rect x="60" y="84" width="220" height="8" fill="#1A1A2E" />

        {/* 메인 선체 */}
        <rect x="40" y="92" width="260" height="32" fill="#0A0E1A" />

        {/* 선체 측면 라인 */}
        <rect x="40" y="92" width="260" height="2" fill="#3A4458" />

        {/* 뱃머리 (오른쪽 끝) */}
        <rect x="300" y="96" width="4" height="24" fill="#0A0E1A" />
        <rect x="304" y="100" width="4" height="16" fill="#0A0E1A" />
        <rect x="308" y="104" width="4" height="8" fill="#0A0E1A" />

        {/* 선미 (왼쪽 끝) */}
        <rect x="36" y="100" width="4" height="20" fill="#0A0E1A" />
        <rect x="32" y="104" width="4" height="14" fill="#0A0E1A" />

        {/* 포트홀 - 위쪽 줄 */}
        {Array.from({ length: 26 }).map((_, i) => (
          <rect
            key={`p1-${i}`}
            x={48 + i * 9}
            y={98}
            width={4}
            height={4}
            fill="#FFC857"
          />
        ))}
        {/* 포트홀 - 아래쪽 줄 */}
        {Array.from({ length: 24 }).map((_, i) => (
          <rect
            key={`p2-${i}`}
            x={56 + i * 9}
            y={112}
            width={4}
            height={4}
            fill="#FFC857"
          />
        ))}

        {/* 상부 갑판 불빛 */}
        {Array.from({ length: 18 }).map((_, i) => (
          <rect
            key={`deck-${i}`}
            x={70 + i * 12}
            y={86}
            width={4}
            height={2}
            fill="#FFE873"
          />
        ))}

        {/* 마스트 */}
        <rect x="60" y="60" width="2" height="32" fill="#1A1A2E" />
        <rect x="280" y="60" width="2" height="32" fill="#1A1A2E" />
      </g>

      {/* 물에 비친 반사 (clip 안에서 함께) */}
      <g clipPath={`url(#${clipId})`} opacity="0.4">
        <rect x="60" y="138" width="200" height="2" fill="#FFC857" />
        <rect x="80" y="142" width="160" height="2" fill="#FF8C42" />
        <rect x="100" y="146" width="120" height="2" fill="#FFC857" />
        <rect x="130" y="150" width="60" height="2" fill="#FFE873" />
      </g>
    </svg>
  );
}

function Funnel({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y="50" width="14" height="36" fill="#C97A3D" />
      <rect x={x} y="50" width="14" height="6" fill="#0A0E1A" />
      <rect x={x + 10} y="50" width="4" height="36" fill="#8B5520" />
    </g>
  );
}

function Smoke({ x }: { x: number }) {
  return (
    <g opacity="0.7">
      <rect x={x} y="40" width="6" height="6" fill="#3A4458" />
      <rect x={x - 4} y="32" width="10" height="6" fill="#4A5568" />
      <rect x={x - 8} y="24" width="14" height="6" fill="#3A4458" />
      <rect x={x - 6} y="16" width="10" height="6" fill="#2D3748" />
    </g>
  );
}

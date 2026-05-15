/**
 * 침몰 중 굴뚝 연기 + 선체 화재.
 * side prop으로 stern(좌측 절반) / bow(우측 절반)만 clip해서 표시.
 * PixelTitanicHalf와 같은 viewBox(0 14 320 138)로 정렬.
 */
export default function PixelSinkingSmoke({
  side,
  className = "",
}: {
  side: "stern" | "bow";
  className?: string;
}) {
  const clipId = `smoke-clip-${side}`;
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
        {/* 4개 굴뚝 위 검은 연기 */}
        <BigSmoke x={107} />
        <BigSmoke x={147} />
        <BigSmoke x={187} />
        <BigSmoke x={227} />

        {/* 선체 화재 - 깜빡임 적용 */}
        <g className="animate-fire-flicker">
          <HullFire x={120} />
          <HullFire x={175} />
          <HullFire x={230} />
        </g>
      </g>
    </svg>
  );
}

function BigSmoke({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 8} y={14} width={20} height={4} fill="#6B7280" opacity="0.35" />
      <rect x={x - 12} y={18} width={28} height={6} fill="#6B7280" opacity="0.55" />
      <rect x={x - 14} y={24} width={32} height={6} fill="#4A5568" opacity="0.7" />
      <rect x={x - 12} y={30} width={28} height={6} fill="#4A5568" opacity="0.8" />
      <rect x={x - 8} y={36} width={20} height={6} fill="#3A4458" opacity="0.9" />
      <rect x={x - 4} y={42} width={14} height={8} fill="#2D3748" />

      <rect x={x + 2} y={44} width={4} height={4} fill="#FF6B35" opacity="0.6" />
      <rect x={x - 2} y={38} width={4} height={4} fill="#E94560" opacity="0.4" />
    </g>
  );
}

function HullFire({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={88} width={8} height={6} fill="#E94560" />
      <rect x={x + 1} y={82} width={6} height={6} fill="#FF6B35" />
      <rect x={x + 2} y={76} width={4} height={6} fill="#FFC857" />
      <rect x={x + 3} y={70} width={2} height={6} fill="#FFE873" />

      <rect x={x - 4} y={86} width={4} height={4} fill="#FF6B35" opacity="0.75" />
      <rect x={x + 8} y={86} width={4} height={4} fill="#FF6B35" opacity="0.75" />
      <rect x={x - 2} y={90} width={4} height={2} fill="#FFC857" opacity="0.8" />
    </g>
  );
}

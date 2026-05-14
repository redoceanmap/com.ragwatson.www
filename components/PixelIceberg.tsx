export default function PixelIceberg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {/* 빙산 본체 (계단형 픽셀) */}
      <rect x="32" y="8" width="12" height="8" fill="#B8D4E3" />
      <rect x="24" y="16" width="32" height="8" fill="#B8D4E3" />
      <rect x="16" y="24" width="48" height="8" fill="#B8D4E3" />
      <rect x="8" y="32" width="64" height="8" fill="#B8D4E3" />
      {/* 그림자 면 */}
      <rect x="44" y="8" width="4" height="8" fill="#6FA0BC" />
      <rect x="48" y="16" width="8" height="8" fill="#6FA0BC" />
      <rect x="56" y="24" width="8" height="8" fill="#6FA0BC" />
      <rect x="64" y="32" width="8" height="8" fill="#6FA0BC" />
      {/* 하이라이트 (왼쪽 위) */}
      <rect x="32" y="8" width="4" height="2" fill="#F0EFE7" />
      <rect x="24" y="16" width="6" height="2" fill="#F0EFE7" />
      {/* 수면 아래 (살짝 비치는 부분) */}
      <rect x="12" y="40" width="56" height="4" fill="#7AA8C7" opacity="0.5" />
    </svg>
  );
}

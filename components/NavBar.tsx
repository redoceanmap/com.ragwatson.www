"use client";

import Link from "next/link";
import { useUIStore } from "@/lib/uiStore";
import { clearSession } from "@/lib/auth";
import PixelAuthModal from "@/components/PixelAuthModal";

export default function NavBar() {
  const user = useUIStore((s) => s.user);
  const setUser = useUIStore((s) => s.setUser);
  const openAuth = useUIStore((s) => s.openAuth);

  const handleLogout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-hull border-b-4 border-accent">
        <div className="mx-auto max-w-6xl px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs pixel-text">
            <Link href="/titanic" className="flex items-center gap-2 text-ink font-bold pixel-text text-xs sm:text-sm">
              <span className="relative w-8 h-8 sm:w-9 sm:h-9 bg-accent border-2 sm:border-4 border-black grid place-items-center text-hull text-sm animate-flicker">
                ☼
              </span>
              <span className="hidden sm:inline text-shadow-pixel">TITANIC</span>
            </Link>
            <BrassPlate href="/" badge="HOME" icon="⌂">
              홈
            </BrassPlate>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 text-xs pixel-text">
            <BrassPlate href="/titanic/predict" badge="DECK" icon="⚓">
              타이타닉
            </BrassPlate>
            {user ? (
              <>
                <span className="hidden sm:inline text-accent bg-hull px-3 py-2 border-4 border-accent shadow-pixel-sm">
                  {user.name}
                </span>
                <BrassPlate onClick={handleLogout} badge="EXIT" icon="✕">
                  로그아웃
                </BrassPlate>
              </>
            ) : (
              <BrassPlate onClick={() => openAuth("login")} badge="1ST" icon="★" variant="polished">
                로그인
              </BrassPlate>
            )}
          </div>
        </div>
      </header>
      <PixelAuthModal />
    </>
  );
}

type Variant = "patina" | "polished";

interface BrassPlateProps {
  href?: string;
  onClick?: () => void;
  badge?: string;
  icon?: string;
  variant?: Variant;
  children: React.ReactNode;
}

function BrassPlate({ href, onClick, badge, icon, variant = "patina", children }: BrassPlateProps) {
  const isPolished = variant === "polished";

  const variantStyle = isPolished
    ? "bg-gradient-to-b from-accent to-accent-hover text-hull border-black hover:from-accent hover:to-accent shadow-glow"
    : "bg-gradient-to-b from-night-mid to-hull text-accent border-accent hover:from-hull hover:to-night-deep";

  const rivetColor = isPolished ? "bg-hull" : "bg-accent";
  const dividerColor = isPolished ? "bg-hull/40" : "bg-accent/40";
  const badgeColor = isPolished ? "text-hull/70" : "text-accent/60";

  const className = `relative pl-1.5 sm:pl-2 pr-2 sm:pr-3 py-1 sm:py-2 border-2 sm:border-4 whitespace-nowrap shadow-none sm:shadow-pixel-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none inline-flex items-center gap-1.5 sm:gap-2 ${variantStyle}`;

  const inner = (
    <>
      {/* 모서리 4개 리벳 (놋쇠 명판 못) */}
      <span className={`hidden sm:block absolute top-[3px] left-[3px] w-1 h-1 ${rivetColor}`} />
      <span className={`hidden sm:block absolute top-[3px] right-[3px] w-1 h-1 ${rivetColor}`} />
      <span className={`hidden sm:block absolute bottom-[3px] left-[3px] w-1 h-1 ${rivetColor}`} />
      <span className={`hidden sm:block absolute bottom-[3px] right-[3px] w-1 h-1 ${rivetColor}`} />

      {/* 클래스 배지 */}
      {badge && (
        <span className="hidden sm:flex flex-col items-center leading-none">
          <span className={`pixel-text text-[7px] ${badgeColor}`}>{badge}</span>
          <span className={`mt-1 w-4 h-px ${dividerColor}`} />
        </span>
      )}

      {/* 본문 */}
      <span className="relative flex items-center gap-1.5">
        {icon && <span className="text-[10px]">{icon}</span>}
        <span>{children}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} type="button">
      {inner}
    </button>
  );
}

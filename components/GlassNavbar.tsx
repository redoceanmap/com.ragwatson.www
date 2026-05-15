"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/titanic", label: "Titanic" },
  { href: "/projects/redoceanmap", label: "RedOceanMap" },
];

export function GlassNavbar() {
  const pathname = usePathname();
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(94%,960px)]">
      <nav className="glass-surface glass-highlight relative flex items-center justify-between rounded-full px-3 py-2">
        <Link
          href="/"
          className="px-3 py-1.5 font-display text-sm font-semibold tracking-tight text-white/90 hover:text-white transition"
        >
          jangminseok<span className="text-white/40">.dev</span>
        </Link>

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "relative inline-flex items-center rounded-full px-3.5 py-1.5 text-sm transition-all duration-300",
                      active
                        ? "text-white shadow-glass-sm bg-white/10 border border-white/15"
                        : "text-white/65 hover:text-white hover:bg-white/[0.06]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 pl-2 ml-1 border-l border-white/10">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm text-white hover:bg-white/15 transition"
            >
              회원가입
            </button>
          </div>
        </div>
      </nav>

      <AuthModal
        open={authMode !== null}
        initialMode={authMode ?? "login"}
        onClose={() => setAuthMode(null)}
      />
    </header>
  );
}

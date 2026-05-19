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
      <nav className="glass-surface relative flex items-center justify-between rounded-full px-3 py-2">
        <Link
          href="/"
          className="px-3 py-1.5 font-display text-sm font-semibold tracking-tight text-[#191F28] hover:text-black transition"
        >
          jangminseok<span className="text-[#8B95A1]">.dev</span>
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
                        ? "text-[#191F28] bg-[#F2F4F6]"
                        : "text-[#4E5968] hover:text-[#191F28] hover:bg-[#F8F9FA]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 pl-2 ml-1 border-l border-[#E5E8EB]">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm text-[#4E5968] hover:text-[#191F28] hover:bg-[#F8F9FA] transition"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className="inline-flex items-center rounded-full bg-[#BE123C] px-3.5 py-1.5 text-sm font-medium text-white hover:bg-[#9F1239] transition"
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

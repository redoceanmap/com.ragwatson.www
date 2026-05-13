"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, displayName, getProfile, getToken, type Profile } from "@/lib/auth";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    setAuthed(!!getToken());
  }, [pathname]);

  if (pathname === "/login") return null;

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-canvas/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-ink font-semibold">
          <span className="w-7 h-7 rounded-lg bg-accent grid place-items-center text-white text-sm">
            ⚙
          </span>
          RagWatson
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <NavLink href="/" active={pathname === "/"}>홈</NavLink>
          <NavLink href="/logs" active={pathname?.startsWith("/logs") ?? false}>로그</NavLink>
        </nav>

        <div className="flex items-center gap-3 text-sm text-muted">
          {authed ? (
            <>
              <span className="hidden sm:inline">{displayName(profile)}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full border border-border bg-white hover:bg-gray-50 transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-full bg-accent text-white hover:bg-accent-hover transition"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full transition ${
        active ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

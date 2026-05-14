import type { Metadata } from "next";
import { Noto_Sans_KR, Press_Start_2P } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RagWatson Agora",
  description: "대화형 AI 에이전트 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${pressStart.variable}`}>
      <body className="min-h-screen font-sans bg-sky">
        <NavBar />
        {children}
      </body>
    </html>
  );
}

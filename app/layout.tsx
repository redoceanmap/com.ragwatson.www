import type { Metadata } from "next";
import { Noto_Sans_KR, Press_Start_2P } from "next/font/google";
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
  title: "jangminseok.dev — Developer Portfolio",
  description: "장민석 개발자 포트폴리오. 학습 프로젝트부터 개인 프로젝트까지.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${pressStart.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

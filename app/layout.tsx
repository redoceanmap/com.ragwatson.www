import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RagWatson Agora",
  description: "대화형 AI 에이전트 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={noto.variable}>
      <body className="min-h-screen font-sans">
        <NavBar />
        {children}
      </body>
    </html>
  );
}

import { Background } from "@/components/Background";
import { GlassNavbar } from "@/components/GlassNavbar";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-glass">
      <Background />
      <GlassNavbar />
      <main className="pt-28 sm:pt-32 pb-24">{children}</main>
    </div>
  );
}

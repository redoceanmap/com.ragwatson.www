import TopNav from "@/components/seoul/TopNav";
import AuthModal from "@/components/seoul/AuthModal";

export default function SeoulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main className="flex-1 flex flex-col min-h-0">{children}</main>
      <AuthModal />
    </>
  );
}

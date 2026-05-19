export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FFF5F7_0%,#FAF6F4_55%,#F5F2F0_100%)]" />

      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#F4A6B8] opacity-35 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#E11D48] opacity-15 blur-[140px] animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[#FCD9C0] opacity-30 blur-[130px] animate-float-slow" />
    </div>
  );
}

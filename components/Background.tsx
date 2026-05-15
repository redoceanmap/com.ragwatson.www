export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1d3a_0%,#08090f_55%,#05060a_100%)]" />

      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#7c8cff] opacity-40 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#ff7ac6] opacity-30 blur-[140px] animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[#5ee7df] opacity-25 blur-[130px] animate-float-slow" />

      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:3px_3px]" />
    </div>
  );
}

import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "soft";
};

export function GlassCard({
  children,
  variant = "default",
  className = "",
  ...rest
}: Props) {
  const surface =
    variant === "soft" ? "glass-surface-soft" : "glass-surface";
  return (
    <div
      {...rest}
      className={[
        surface,
        "glass-highlight relative rounded-3xl p-7 sm:p-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

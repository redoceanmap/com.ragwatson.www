import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type ButtonProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

type Props = ButtonProps | LinkProps;

function classes(variant: "primary" | "ghost", extra = "") {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-300 active:scale-[0.98]";
  const tone =
    variant === "primary"
      ? "bg-[#BE123C] text-white hover:bg-[#9F1239] shadow-[0_4px_16px_-4px_rgba(190,18,60,0.35)]"
      : "bg-white text-[#191F28] border border-[#E5E8EB] hover:bg-[#F8F9FA]";
  return [base, tone, extra].join(" ");
}

export function GlassButton(props: Props) {
  const { variant = "primary", className = "", children } = props;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noreferrer"
          className={classes(variant, className)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes(variant, className)}>
        {children}
      </Link>
    );
  }

  const btnProps = props as ButtonProps;
  return (
    <button
      type={btnProps.type ?? "button"}
      onClick={btnProps.onClick}
      className={classes(variant, className)}
    >
      {children}
    </button>
  );
}

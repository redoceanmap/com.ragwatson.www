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
    "glass-highlight relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-300 active:scale-[0.98]";
  const tone =
    variant === "primary"
      ? "glass-surface text-white hover:bg-white/[0.14]"
      : "glass-surface-soft text-white/80 hover:text-white hover:bg-white/[0.1]";
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

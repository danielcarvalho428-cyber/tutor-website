import type { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  href,
  variant = "primary",
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "inline-block rounded-xl bg-[#183A7A] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#2454A6] shadow-sm"
      : "inline-block rounded-xl border border-[#d4b24c] bg-white px-6 py-3 text-base font-semibold text-[#183A7A] transition hover:bg-[#fff9e8]";

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
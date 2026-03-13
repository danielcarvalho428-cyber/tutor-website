import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
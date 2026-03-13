import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#d7e3ff] bg-white p-8 shadow-[0_12px_30px_rgba(24,58,122,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}
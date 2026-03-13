// app/admin/StatusSelect.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  bookingId: number;
  currentStatus: string;
};

const STATUS_OPTIONS = [
  { value: "pendente", label: "Pendente" },
  { value: "confirmado", label: "Confirmado" },
  { value: "concluído", label: "Concluído" },
  { value: "cancelado", label: "Cancelado" },
];

export default function StatusSelect({
  bookingId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(nextStatus: string) {
    setStatus(nextStatus);
    setLoading(true);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Não foi possível atualizar o status.");
        setStatus(currentStatus);
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao atualizar o status.");
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <label
        htmlFor={`status-${bookingId}`}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
      >
        Atualizar status
      </label>

      <select
        id={`status-${bookingId}`}
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-500 disabled:opacity-60"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {loading && option.value === status
              ? `${option.label}...`
              : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
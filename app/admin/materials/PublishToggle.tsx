// app/admin/materials/PublishToggle.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  materialId: number;
  isPublished: boolean;
};

export default function PublishToggle({
  materialId,
  isPublished,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/materials/${materialId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isPublished: !isPublished,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Não foi possível atualizar o material.");
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao atualizar material.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleToggle}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${
        isPublished
          ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
          : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
    >
      {loading
        ? "Salvando..."
        : isPublished
        ? "Despublicar"
        : "Publicar"}
    </button>
  );
}
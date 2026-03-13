"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  materialId: number;
  currentValue: boolean;
};

export default function PublishToggle({ materialId, currentValue }: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState(currentValue);
  const [loading, setLoading] = useState(false);

  async function handleChange(nextValue: boolean) {
    setChecked(nextValue);
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/materials/${materialId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_published: nextValue,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Não foi possível atualizar a publicação.");
        setChecked(currentValue);
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao atualizar publicação.");
      setChecked(currentValue);
    } finally {
      setLoading(false);
    }
  }

  return (
    <label className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        disabled={loading}
        onChange={(e) => handleChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300"
      />
      {loading
        ? "Salvando..."
        : checked
        ? "Material publicado"
        : "Material oculto"}
    </label>
  );
}
// app/admin/materials/DeleteMaterialButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  materialId: number;
  materialTitle: string;
};

export default function DeleteMaterialButton({
  materialId,
  materialTitle,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o material "${materialTitle}"?`
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/materials/${materialId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Não foi possível excluir o material.");
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao excluir material.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleDelete}
      className="inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
    >
      {loading ? "Excluindo..." : "Excluir material"}
    </button>
  );
}
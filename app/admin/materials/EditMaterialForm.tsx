// app/admin/materials/EditMaterialForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const FILE_TYPES = ["Arquivo", "PDF", "Lista de exercícios", "Resumo", "Apostila"];
const URL_TYPES = ["Link", "Vídeo"];

type Props = {
  materialId: number;
  initialTitle: string;
  initialSubject: string | null;
  initialLevel: string | null;
  initialType: string | null;
  initialDescription: string | null;
  initialFileUrl: string | null;
};

export default function EditMaterialForm({
  materialId,
  initialTitle,
  initialSubject,
  initialLevel,
  initialType,
  initialDescription,
  initialFileUrl,
}: Props) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [title, setTitle] = useState(initialTitle);
  const [subject, setSubject] = useState(initialSubject || "Matemática");
  const [level, setLevel] = useState(initialLevel || "Ensino Médio");
  const [type, setType] = useState(initialType || "Arquivo");
  const [description, setDescription] = useState(initialDescription ?? "");
  const [fileUrl, setFileUrl] = useState(initialFileUrl ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isFileType = FILE_TYPES.includes(type);
  const isUrlType = URL_TYPES.includes(type);

  async function uploadSelectedFile() {
    if (!selectedFile) {
      return null;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Sessão não encontrada. Faça login novamente.");
    }

    const fileExt = selectedFile.name.split(".").pop()?.toLowerCase() || "file";
    const safeTitle = title
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const filePath = `${Date.now()}-${safeTitle || "material"}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("materials")
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("materials").getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isFileType && !selectedFile && !fileUrl.trim()) {
        alert("Selecione um arquivo ou mantenha um link de arquivo válido.");
        return;
      }

      if (isUrlType && !fileUrl.trim()) {
        alert("Informe o link para esse tipo de material.");
        return;
      }

      let finalFileUrl: string | null = null;

      if (isFileType) {
        finalFileUrl = selectedFile ? await uploadSelectedFile() : fileUrl.trim();
      } else {
        finalFileUrl = fileUrl.trim();
      }

      const response = await fetch(`/api/admin/materials/${materialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subject,
          level,
          type,
          description,
          fileUrl: finalFileUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Não foi possível atualizar o material.");
        return;
      }

      setSelectedFile(null);
      setOpen(false);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar material.";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  function handleTypeChange(nextType: string) {
    setType(nextType);

    if (FILE_TYPES.includes(nextType)) {
      // keep existing fileUrl because it may already be a storage file
    }

    if (URL_TYPES.includes(nextType)) {
      setSelectedFile(null);
    }
  }

  return (
    <div className="w-full">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Editar material
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="grid gap-4">
            <div>
              <label
                htmlFor={`title-${materialId}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Título
              </label>
              <input
                id={`title-${materialId}`}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  htmlFor={`subject-${materialId}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Matéria
                </label>
                <select
                  id={`subject-${materialId}`}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                >
                  <option value="Matemática">Matemática</option>
                  <option value="Física">Física</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor={`level-${materialId}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Nível
                </label>
                <select
                  id={`level-${materialId}`}
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                >
                  <option value="6º ao 9º ano">6º ao 9º ano</option>
                  <option value="Ensino Médio">Ensino Médio</option>
                  <option value="Cursinho">Cursinho</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor={`type-${materialId}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Tipo
                </label>
                <select
                  id={`type-${materialId}`}
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                >
                  <option value="Arquivo">Arquivo</option>
                  <option value="PDF">PDF</option>
                  <option value="Lista de exercícios">Lista de exercícios</option>
                  <option value="Resumo">Resumo</option>
                  <option value="Apostila">Apostila</option>
                  <option value="Link">Link</option>
                  <option value="Vídeo">Vídeo</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor={`description-${materialId}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Descrição
              </label>
              <textarea
                id={`description-${materialId}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              />
            </div>

            {isFileType ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label
                  htmlFor={`materialFile-${materialId}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Substituir arquivo
                </label>
                <input
                  id={`materialFile-${materialId}`}
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Deixe vazio para manter o arquivo atual.
                </p>
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label
                htmlFor={`fileUrl-${materialId}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                {isUrlType
                  ? type === "Vídeo"
                    ? "Link do vídeo"
                    : "Link do material"
                  : "Link atual do arquivo"}
              </label>
              <input
                id={`fileUrl-${materialId}`}
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://..."
                required={isUrlType}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                {isUrlType
                  ? "Para esse tipo de material, o link é obrigatório."
                  : "Esse campo mostra o link salvo atualmente para o material."}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setTitle(initialTitle);
                setSubject(initialSubject || "Matemática");
                setLevel(initialLevel || "Ensino Médio");
                setType(initialType || "Arquivo");
                setDescription(initialDescription ?? "");
                setFileUrl(initialFileUrl ?? "");
                setSelectedFile(null);
                setOpen(false);
              }}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
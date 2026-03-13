// app/admin/materials/CreateMaterialForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const FILE_TYPES = ["Arquivo", "PDF", "Lista de exercícios", "Resumo", "Apostila"];
const URL_TYPES = ["Link", "Vídeo"];

export default function CreateMaterialForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Matemática");
  const [level, setLevel] = useState("Ensino Médio");
  const [type, setType] = useState("Arquivo");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
      if (isFileType && !selectedFile) {
        alert("Selecione um arquivo para esse tipo de material.");
        return;
      }

      if (isUrlType && !fileUrl.trim()) {
        alert("Informe o link para esse tipo de material.");
        return;
      }

      let finalFileUrl: string | null = null;

      if (isFileType) {
        finalFileUrl = await uploadSelectedFile();
      } else {
        finalFileUrl = fileUrl.trim();
      }

      const response = await fetch("/api/admin/materials", {
        method: "POST",
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
        alert(data.error || "Não foi possível criar o material.");
        return;
      }

      setTitle("");
      setSubject("Matemática");
      setLevel("Ensino Médio");
      setType("Arquivo");
      setDescription("");
      setFileUrl("");
      setSelectedFile(null);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar material.";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  function handleTypeChange(nextType: string) {
    setType(nextType);

    if (FILE_TYPES.includes(nextType)) {
      setFileUrl("");
    }

    if (URL_TYPES.includes(nextType)) {
      setSelectedFile(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Título
        </label>
        <input
          id="title"
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
            htmlFor="subject"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Matéria
          </label>
          <select
            id="subject"
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
            htmlFor="level"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Nível
          </label>
          <select
            id="level"
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
            htmlFor="type"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Tipo
          </label>
          <select
            id="type"
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
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
        />
      </div>

      {isFileType ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label
            htmlFor="materialFile"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Upload do arquivo
          </label>
          <input
            id="materialFile"
            type="file"
            required={isFileType}
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
          />
          <p className="mt-2 text-xs text-slate-500">
            Para esse tipo de material, o envio de arquivo é obrigatório.
          </p>
        </div>
      ) : null}

      {isUrlType ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label
            htmlFor="fileUrl"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            {type === "Vídeo" ? "Link do vídeo" : "Link do material"}
          </label>
          <input
            id="fileUrl"
            type="url"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="https://..."
            required={isUrlType}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
          />
          <p className="mt-2 text-xs text-slate-500">
            Para esse tipo de material, o link é obrigatório.
          </p>
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Criando..." : "Criar material"}
        </button>
      </div>
    </form>
  );
}
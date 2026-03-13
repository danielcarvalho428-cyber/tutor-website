// app/admin/materials/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Eye,
  FileText,
  FolderOpen,
  PlusCircle,
  Shield,
} from "lucide-react";

import CreateMaterialForm from "./CreateMaterialForm";
import DeleteMaterialButton from "./DeleteMaterialButton";
import EditMaterialForm from "./EditMaterialForm";
import PublishToggle from "./PublishToggle";
import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/get-user-role";

type Material = {
  id: number;
  title: string;
  subject: string | null;
  level: string | null;
  type: string | null;
  description: string | null;
  file_url: string | null;
  is_published: boolean;
  created_at: string;
};

export default async function AdminMaterialsPage() {
  const authData = await getUserRole();

  if (!authData.user || authData.role !== "admin") {
    redirect("/dashboard");
  }

  const supabase = await createClient();

  const { data: materials, error } = await supabase
    .from("materials")
    .select(
      "id, title, subject, level, type, description, file_url, is_published, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar materiais: ${error.message}`);
  }

  const publishedCount =
    materials?.filter((material) => material.is_published).length ?? 0;
  const draftCount =
    materials?.filter((material) => !material.is_published).length ?? 0;

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white px-4 py-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 px-8 py-10 text-white">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                    Administração de materiais
                  </span>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Gerenciar materiais
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    Crie, edite, publique, despublique e exclua materiais da
                    plataforma mantendo tudo organizado em uma interface mais
                    clara e padronizada.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Perfil
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Administrador
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Total de materiais
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {materials?.length ?? 0} material
                      {(materials?.length ?? 0) === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Total</p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {materials?.length ?? 0}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Materiais cadastrados na plataforma.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Eye className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Publicados
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {publishedCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Materiais visíveis para os alunos.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Rascunhos
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {draftCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Itens prontos para revisão e publicação.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Controle
                  </p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  CRUD completo
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Criar, editar, publicar, despublicar e excluir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/admin"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Navegação
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Voltar ao painel admin
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Retorne para a visão principal da administração.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Voltar
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/materials"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Visualização
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Ver página dos alunos
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Confira como os materiais publicados aparecem na área do aluno.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Abrir página
                <Eye className="h-4 w-4" />
              </span>
            </Link>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
                Organização
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Biblioteca central
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mantenha a biblioteca organizada por matéria, nível e tipo de
                conteúdo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Criação
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Novo material
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Adicione um novo conteúdo à plataforma usando o formulário
                  abaixo.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <PlusCircle className="h-4 w-4" />
                Cadastro rápido
              </div>
            </div>

            <CreateMaterialForm />
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Biblioteca
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Materiais cadastrados
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Total: {materials?.length ?? 0}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                <FolderOpen className="h-4 w-4" />
                Gestão de materiais
              </div>
            </div>

            {!materials || materials.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                <p className="text-base font-medium text-slate-800">
                  Nenhum material cadastrado ainda.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {materials.map((material: Material) => (
                  <div
                    key={material.id}
                    className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 transition hover:border-slate-300"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                              {material.title}
                            </h3>

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                material.is_published
                                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border border-amber-200 bg-amber-50 text-amber-700"
                              }`}
                            >
                              {material.is_published ? "Publicado" : "Rascunho"}
                            </span>

                            {material.subject ? (
                              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                {material.subject}
                              </span>
                            ) : null}

                            {material.level ? (
                              <span className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                                {material.level}
                              </span>
                            ) : null}

                            {material.type ? (
                              <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                                {material.type}
                              </span>
                            ) : null}
                          </div>

                          {material.description ? (
                            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                              {material.description}
                            </p>
                          ) : (
                            <p className="mt-4 text-sm italic text-slate-400">
                              Sem descrição.
                            </p>
                          )}

                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Criado em
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {new Date(material.created_at).toLocaleString(
                                  "pt-BR"
                                )}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Link do arquivo
                              </p>
                              <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {material.file_url || "Não informado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                          <PublishToggle
                            materialId={material.id}
                            isPublished={material.is_published}
                          />
                          <DeleteMaterialButton
                            materialId={material.id}
                            materialTitle={material.title}
                          />
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
                        <EditMaterialForm
                          materialId={material.id}
                          initialTitle={material.title}
                          initialSubject={material.subject}
                          initialLevel={material.level}
                          initialType={material.type}
                          initialDescription={material.description}
                          initialFileUrl={material.file_url}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Continuidade
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Biblioteca organizada e pronta para crescer
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Use esta área para manter a experiência do aluno mais clara,
                  consistente e profissional, publicando somente o que estiver
                  pronto.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/materials"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  <Eye className="h-4 w-4" />
                  Ver área do aluno
                </Link>

                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <ArrowRight className="h-4 w-4" />
                  Voltar ao painel admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
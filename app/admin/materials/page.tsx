// app/admin/materials/page.tsx
import { redirect } from "next/navigation";

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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Painel administrativo
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Gerenciar materiais
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Crie, edite, publique, despublique e exclua materiais para os
            alunos.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Novo material
          </h2>
          <CreateMaterialForm />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Materiais cadastrados
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Total: {materials?.length ?? 0}
              </p>
            </div>
          </div>

          {!materials || materials.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
              Nenhum material cadastrado ainda.
            </div>
          ) : (
            <div className="space-y-4">
              {materials.map((material: Material) => (
                <div
                  key={material.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {material.title}
                          </h3>

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              material.is_published
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
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
                          <p className="max-w-3xl text-sm leading-6 text-slate-600">
                            {material.description}
                          </p>
                        ) : (
                          <p className="text-sm italic text-slate-400">
                            Sem descrição.
                          </p>
                        )}

                        <div className="space-y-1 text-xs text-slate-400">
                          <p>
                            Criado em{" "}
                            {new Date(material.created_at).toLocaleString(
                              "pt-BR"
                            )}
                          </p>
                          <p className="break-all">
                            Link: {material.file_url || "Não informado"}
                          </p>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
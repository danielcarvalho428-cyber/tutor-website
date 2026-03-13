// app/api/admin/materials/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/get-user-role";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const authData = await getUserRole();

    if (!authData.user || authData.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { id } = await params;
    const materialId = Number(id);

    if (!Number.isFinite(materialId)) {
      return NextResponse.json(
        { error: "ID do material inválido." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const isPublished = body?.isPublished;

    if (typeof isPublished !== "boolean") {
      return NextResponse.json(
        { error: "Valor de publicação inválido." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("materials")
      .update({ is_published: isPublished })
      .eq("id", materialId);

    if (error) {
      return NextResponse.json(
        { error: "Não foi possível atualizar o material." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao atualizar material." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const authData = await getUserRole();

    if (!authData.user || authData.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { id } = await params;
    const materialId = Number(id);

    if (!Number.isFinite(materialId)) {
      return NextResponse.json(
        { error: "ID do material inválido." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const level = typeof body?.level === "string" ? body.level.trim() : "";
    const type = typeof body?.type === "string" ? body.type.trim() : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const fileUrl =
      typeof body?.fileUrl === "string" ? body.fileUrl.trim() : "";

    if (!title) {
      return NextResponse.json(
        { error: "Título é obrigatório." },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Matéria é obrigatória." },
        { status: 400 }
      );
    }

    if (!level) {
      return NextResponse.json(
        { error: "Nível é obrigatório." },
        { status: 400 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: "Tipo é obrigatório." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("materials")
      .update({
        title,
        subject,
        level,
        type,
        description: description || null,
        file_url: fileUrl || null,
      })
      .eq("id", materialId);

    if (error) {
      return NextResponse.json(
        { error: "Não foi possível editar o material." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao editar material." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  try {
    const authData = await getUserRole();

    if (!authData.user || authData.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { id } = await params;
    const materialId = Number(id);

    if (!Number.isFinite(materialId)) {
      return NextResponse.json(
        { error: "ID do material inválido." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("materials")
      .delete()
      .eq("id", materialId);

    if (error) {
      return NextResponse.json(
        { error: "Não foi possível excluir o material." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao excluir material." },
      { status: 500 }
    );
  }
}
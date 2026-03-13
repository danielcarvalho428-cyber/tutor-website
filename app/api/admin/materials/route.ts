// app/api/admin/materials/route.ts
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/get-user-role";

export async function POST(request: NextRequest) {
  try {
    const authData = await getUserRole();

    if (!authData.user || authData.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
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

    const { data, error } = await supabase
      .from("materials")
      .insert({
        title,
        subject,
        level,
        type,
        description: description || null,
        file_url: fileUrl || null,
        is_published: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: `Erro Supabase ao criar material: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, material: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Erro interno ao criar material: ${error.message}`
            : "Erro interno ao criar material.",
      },
      { status: 500 }
    );
  }
}
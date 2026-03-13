import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = ["novo", "em contato", "agendado", "concluído"] as const;

type AllowedStatus = (typeof allowedStatuses)[number];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Não autenticado." },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado." },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const bookingId = Number(id);

    if (!Number.isFinite(bookingId)) {
      return NextResponse.json(
        { success: false, error: "ID inválido." },
        { status: 400 }
      );
    }

    const body = (await request.json()) as { status?: string };
    const nextStatus = body.status?.trim() as AllowedStatus | undefined;

    if (!nextStatus || !allowedStatuses.includes(nextStatus)) {
      return NextResponse.json(
        { success: false, error: "Status inválido." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("bookings")
      .update({ status: nextStatus })
      .eq("id", bookingId);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro interno ao atualizar status." },
      { status: 500 }
    );
  }
}
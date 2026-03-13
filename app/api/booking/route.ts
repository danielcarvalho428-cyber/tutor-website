// app/api/booking/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const level = typeof body?.level === "string" ? body.level.trim() : "";
    const format = typeof body?.format === "string" ? body.format.trim() : "";
    const preferredDay =
      typeof body?.preferredDay === "string" ? body.preferredDay.trim() : "";
    const preferredTime =
      typeof body?.preferredTime === "string" ? body.preferredTime.trim() : "";
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !phone || !email || !subject || !level || !format) {
      return NextResponse.json(
        {
          success: false,
          error: "Preencha os campos obrigatórios.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("bookings").insert({
      user_id: user?.id ?? null,
      name,
      phone,
      email,
      subject,
      level,
      format,
      preferred_day: preferredDay || null,
      preferred_time: preferredTime || null,
      message: message || null,
      status: "pendente",
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Não foi possível salvar o agendamento.",
        },
        { status: 500 }
      );
    }

    const whatsappText =
      `Olá, Professor Kaue Ribeiro!\n\n` +
      `Nova solicitação de aula:\n` +
      `Nome: ${name}\n` +
      `WhatsApp: ${phone}\n` +
      `E-mail: ${email}\n` +
      `Disciplina: ${subject}\n` +
      `Nível: ${level}\n` +
      `Formato: ${format}\n` +
      `Dia preferido: ${preferredDay || "Não informado"}\n` +
      `Horário preferido: ${preferredTime || "Não informado"}\n` +
      `Observações: ${message || "Nenhuma"}`;

    const whatsappUrl = `https://wa.me/5562982273735?text=${encodeURIComponent(
      whatsappText
    )}`;

    return NextResponse.json({
      success: true,
      message: "Solicitação enviada com sucesso.",
      whatsappUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao processar a solicitação.",
      },
      { status: 500 }
    );
  }
}
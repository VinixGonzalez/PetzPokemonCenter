import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);

  if (request.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }

  // Persistência para algum banco de dados

  const isSaved = true; // trocar para simular o redirecionamento das páginas

  if (!isSaved) {
    return NextResponse.json(
      {
        error:
          "Ocorreu um erro ao tentar realizar o agendamento da consulta. Por favor, tente novamente.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ agendamentoStatus: "success" }, { status: 200 });
}

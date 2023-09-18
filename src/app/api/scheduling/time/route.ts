import { NextResponse } from "next/server";

const HORARIOS_DISPONIVEIS = [
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
];

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);

  if (request.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }

  const requestHeaders = new Headers(request.headers);
  if (
    requestHeaders.get("content-type")?.toLowerCase() !== "application/json" &&
    !request.body?.hasOwnProperty("date")
  ) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json(
    { horariosAtendimento: HORARIOS_DISPONIVEIS },
    { status: 200 }
  );
}

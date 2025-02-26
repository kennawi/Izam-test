import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, from, to } = body;

    if (!id || from === undefined || to === undefined) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

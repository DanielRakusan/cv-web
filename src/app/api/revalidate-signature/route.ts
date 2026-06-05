import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Backend zavolá tento endpoint po změně aktivní varianty
// POST { "secret": "...", "id": 3 }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { secret?: string; id?: number };

    if (!process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "secret not configured" }, { status: 500 });
    }
    if (body.secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    revalidatePath("/podpis");
    return NextResponse.json({ revalidated: true, id: body.id });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}

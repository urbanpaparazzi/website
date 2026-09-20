import { NextRequest, NextResponse } from "next/server";
import { incrementViews } from "@/sanity/lib/incrementViews";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    await incrementViews("newsPost", slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to increment news views", err);
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { blogDb } from "../../../../db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const posts = blogDb;
    return NextResponse.json({
      ok: true,
      status: 200,
      posts: posts,
    });
  } catch (error) {
    console.error(
      "There was an interal server error while fetching the requested data.",
      error,
    );
    return NextResponse.json({ error: "Internal Server error", status: 500 });
  }
}

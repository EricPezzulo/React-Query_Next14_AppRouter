import { NextResponse } from "next/server";
import { blogDb } from "../../../../db";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { title, postId } = body;

    const post = blogDb.find((x) => x.postId === Number(postId));

    if (post) {
      post.title = title;
    } else {
      return NextResponse.json("Cant find post");
    }
    console.log(blogDb);
    return NextResponse.json({ ok: true, status: 201, data: request.body });
  } catch (error) {
    console.log("error");
  }
}

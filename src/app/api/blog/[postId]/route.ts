import { NextResponse } from "next/server";
import { blogDb } from "../../../../../db";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { title, postId, content } = body;
    const post = blogDb.find((x) => x.postId === Number(postId));
    if (post) {
      post.title = title;
      post.content = content;
    } else {
      return NextResponse.json("Cant find post");
    }
    return NextResponse.json({ ok: true, status: 201, updatedPost: post });
  } catch (error) {
    console.log("error");
  }
}

export async function GET(
  request: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const postId = params.postId;
    if (!postId) {
      return NextResponse.json({ error: "postId is required" });
    }

    const post = blogDb.find((x) => x.postId === Number(postId));

    if (!post) {
      return NextResponse.json(`There is no post with postId:${postId}`);
    }

    return NextResponse.json({ ok: true, status: 200, post });
  } catch (error) {
    console.error("There was an error fetching the post", error);
    NextResponse.json({ ok: false, status: 500, error });
  }
}

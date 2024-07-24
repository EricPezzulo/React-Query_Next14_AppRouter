"use client";
import React from "react";
import { blogDb } from "../../../../db";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogParams {
  params: {
    postId: number;
  };
}
const BlogPost = ({ params }: { params: { postId: number } }) => {
  const router = useRouter();
  const blogPost = blogDb.find((post) => post.postId == Number(params.postId));
  return (
    <div className="grid place-items-center pt-20">
      <div className="max-w-4xl">
        <button
          className="text-sm font-medium"
          type="button"
          onClick={() => router.back()}
        >
          {"< Back"}
        </button>

        <div className="flex items-center justify-between pt-4">
          <h1 className="text-2xl font-medium">{blogPost?.title}</h1>{" "}
          <p className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 p-4 text-sm font-medium text-white">
            {params.postId}
          </p>
        </div>
        <div className="pt-5">
          <p>{blogPost?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

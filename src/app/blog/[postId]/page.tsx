"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFetchPost } from "@/app/hooks/usePost";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface BlogParams {
  params: {
    postId: number;
  };
}
const BlogPost: React.FC<BlogParams> = ({ params }) => {
  const { data, isLoading, isError } = useFetchPost(params.postId);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex items-center">
        Post is loading <LoadingSpinner />
      </div>
    );
  if (isError)
    return <div className="flex items-center">Could not fetch post.</div>;

  console.log(data.post);
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
          <h1 className="text-2xl font-medium">{data.post.title}</h1>{" "}
          <p className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 p-4 text-sm font-medium text-white">
            {data.post.postId}
          </p>
        </div>
        <div className="pt-5">
          <p>{data.post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

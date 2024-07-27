"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts, useFetchPostsSSR } from "../hooks/usePost";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRouter } from "next/navigation";

export interface BlogPost {
  title: string;
  postId: number;
  content: string;
}

const BlogPosts = () => {
const {data, isLoading, isError} = useFetchPostsSSR()

  const router = useRouter()
  if (isLoading) {
    return (
      <div className="flex items-center">
        <p>Loading blog posts.</p>
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return <div>There was an error 🙁</div>;
  }
  return (
    <div className="p-10">
      <h1 className="text-3xl">Blogs</h1>
      <button
        type="button"
        className="text-sm font-medium"
        onClick={() => router.back()}
      >
        {"< Back"}
      </button>
      <div className="grid grid-cols-1 place-items-center gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {data?.posts.map((post: BlogPost, key: number) => (
          <div key={key} className="p-2">
            <div className="h-[200px] w-[375px] overflow-auto rounded-lg border-2 border-slate-300 p-5 scrollbar-hide sm:w-[500px] lg:w-[400px]">
              <div className="pb-3">
                <Link
                  href={`/blog/${post.postId}`}
                  className="text-xl font-medium hover:underline"
                >
                  {post.title}
                </Link>
              </div>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;

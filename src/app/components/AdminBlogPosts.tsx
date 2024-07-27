"use client";
import { useState } from "react";
import { useFetchPostsSSR } from "../hooks/usePost";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";
import EditBlogPost from "./EditBlogPost";

export interface BlogPost {
  title: string;
  postId: number;
  content: string;
}

const AdminBlogPosts = () => {
  const { data, isLoading, isError } = useFetchPostsSSR();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading posts</p>
        <div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="flex items-center justify-center">
        <p>Error fetching posts</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <p className="text-3xl font-medium">Admin Page</p>
      <button
        type="button"
        onClick={() => router.back()}
        className="pb-5 text-sm font-medium"
      >
        {"< Back"}
      </button>

      <div className="grid grid-cols-1 place-items-center gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {data.posts.map((post: BlogPost, index: number) => (
          <EditBlogPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AdminBlogPosts;

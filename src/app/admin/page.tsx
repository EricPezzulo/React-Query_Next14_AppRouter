"use client";
import { useRouter } from "next/navigation";

import AdminBlogPost from "../components/AdminBlogPost";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetchPosts } from "../hooks/usePost";

interface BlogPost {
  title: string;
  postId: number;
  content: string;
}
const Blog = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useFetchPosts();

  if (isLoading) {
    return (
      <div className="flex items-center">
        <p>Loading blog posts </p>
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return <div>There was an error.</div>;
  }
  return (
    <div className="p-10">
      <h1 className="text-3xl">Admin</h1>
      <button
        type="button"
        className="text-sm font-medium"
        onClick={() => router.back()}
      >
        {"< Back"}
      </button>
      <div className="grid grid-cols-2">
        {data.posts.map((post: BlogPost, key: number) => (
          <AdminBlogPost key={key} index={key} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;

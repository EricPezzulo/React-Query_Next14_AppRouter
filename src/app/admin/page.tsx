"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usePosts from "../hooks/usePosts";
import AdminBlogPost from "../components/AdminBlogPost";

interface BlogPost {
  title: string;
  postId: number;
  content: string;
}
const Blog = () => {
  const router = useRouter();
  const postQuery = usePosts();

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
        {postQuery.data?.posts.map((post: BlogPost, key: number) => (
          <AdminBlogPost key={key} index={key} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;

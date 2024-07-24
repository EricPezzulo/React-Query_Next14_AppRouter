"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usePosts from "../hooks/usePosts";

interface BlogPost {
  title: string;
  postId: number;
  content: string;
}
const Blog = () => {
  const router = useRouter();
  const postQuery = usePosts();
  console.log(postQuery.data);
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
      <div className="grid grid-cols-2">
        {postQuery.data?.posts.map((post: BlogPost, key: number) => (
          <div key={key} className="p-2">
            <div className="h-[200px] w-[500px] overflow-auto rounded-lg border-2 border-slate-300 p-5 scrollbar-hide">
              <Link
                href={`/blog/${post.postId}`}
                className="text-xl font-medium hover:underline"
              >
                {post.title}
              </Link>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

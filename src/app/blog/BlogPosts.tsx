"use client";
import { useFetchPostsSSR } from "../hooks/usePost";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRouter } from "next/navigation";

interface BlogPost {
  title: string;
  postId: number;
  content: string;
}

const BlogPosts = () => {
  const { data, isLoading, isError } = useFetchPostsSSR();
  const router = useRouter();
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
      <h1 className="text-3xl">Blog Page</h1>
      <button
        type="button"
        className="text-sm font-medium pb-5"
        onClick={() => router.back()}
      >
        {"< Back"}
      </button>
      <div className="grid grid-cols-1 place-items-center gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {data?.posts.map((post: BlogPost, key: number) => (
          <div key={key} >
            <div className="h-[200px] overflow-auto w-full rounded-lg border border-slate-200 p-5 scrollbar-hide sm:w-full">
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

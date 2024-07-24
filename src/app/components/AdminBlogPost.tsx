"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const AdminBlogPost = ({
  index,
  post,
}: {
  index: number;
  post: { title: string; postId: number; content: string };
}) => {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("test");

  const editPost = async () => {
    await fetch(`/blog/${post.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, postId: post.postId }),
    });
  };
  const postMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
  const clickMutate = () => {
    postMutation.mutate({
      title: title,
      postId: post.postId,
    });
    setEdit((prev) => !prev);
  };
  return (
    <div className="p-2">
      <div className="h-[200px] w-[500px] overflow-auto rounded-lg border-2 border-slate-300 p-5 scrollbar-hide">
        <div className="flex items-center justify-between">
          {edit ? (
            <div className="pb-3">
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 rounded bg-slate-100 px-1 text-xl font-medium outline outline-1 outline-slate-300"
                type="text"
                defaultValue={post.title}
              />
            </div>
          ) : (
            <div className="pb-3">
              <Link
                href={`/blog/${post.postId}`}
                className="flex h-10 items-center pl-1 text-xl font-medium hover:underline"
              >
                {post.title}
              </Link>{" "}
            </div>
          )}

          <button
            type="button"
            onClick={edit ? clickMutate : () => setEdit((prev) => !prev)}
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>
        <div>
          {edit ? (
            <textarea
              className="h-28 w-full resize-none overflow-auto rounded bg-slate-100 px-2 outline outline-1 outline-slate-300"
              defaultValue={post.content}
            />
          ) : (
            <p>{post.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminBlogPost;

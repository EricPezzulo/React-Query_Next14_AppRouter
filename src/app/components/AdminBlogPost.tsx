"use client";

import Link from "next/link";
import { useState } from "react";
import { useEditPost } from "../hooks/usePost";
import CheckIcon from "./svgs/CheckIcon";
import PencilIcon from "./svgs/PencilIcon";

const AdminBlogPost = ({
  index,
  post,
}: {
  index: number;
  post: { title: string; postId: number; content: string };
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);

  const { mutate: updatePost } = useEditPost();

  const handleEditPostClick = () => {
    const updatedPost = { postId: post.postId, title, content };
    updatePost(updatedPost);
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
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={
              edit ? handleEditPostClick : () => setEdit((prev) => !prev)
            }
          >
            {edit ? <CheckIcon /> : <PencilIcon />}
          </button>
        </div>
        <div>
          {edit ? (
            <textarea
              onChange={(e) => setContent(e.target.value)}
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

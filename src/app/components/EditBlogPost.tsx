import Link from "next/link";
import CheckIcon from "./svgs/CheckIcon";
import PencilIcon from "./svgs/PencilIcon";
import { useEditPost } from "../hooks/usePost";
import { useState } from "react";
import { BlogPost } from "./AdminBlogPosts";

const EditBlogPost = ({ post }: { post: BlogPost }) => {
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
    <div className="h-[200px] w-full overflow-auto rounded-lg border border-slate-200 p-5 scrollbar-hide sm:w-full">
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
          onClick={edit ? handleEditPostClick : () => setEdit((prev) => !prev)}
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
  );
};

export default EditBlogPost;
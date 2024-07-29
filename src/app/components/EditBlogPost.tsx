import Link from "next/link";
import CheckIcon from "./svgs/CheckIcon";
import PencilIcon from "./svgs/PencilIcon";
import { useEditPost } from "../hooks/usePost";
import { useState } from "react";
import { BlogPost } from "./AdminBlogPosts";
import clsx from "clsx";

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
              value={title}
            />
            {/* <hr className="m-0 p-0 w-1/3" /> */}
          </div>
        ) : (
          <div className="w-full pb-3">
            <Link
              href={`/blog/${post.postId}`}
              className="flex h-10 items-center pl-1 text-xl font-medium text-slate-700 hover:text-black"
            >
              {title}
            </Link>
            <hr className="m-0 w-1/3 rounded-full border-[1px] border-slate-200 p-0" />
          </div>
        )}

        <div className="flex">
          {edit ? (
            <div className="pr-2">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
                disabled={title || content ? false : true}
                className={clsx(
                  "rounded border border-slate-500 px-2 text-xs font-medium text-slate-500",
                  {
                    "bg-slate-300": !title || !content,
                    "bg-white": title || content,
                  },
                )}
              >
                clear
              </button>
            </div>
          ) : null}
          <button
            type="button"
            onClick={
              edit ? handleEditPostClick : () => setEdit((prev) => !prev)
            }
          >
            {edit ? (
              <div className="rounded p-1 duration-100 ease-in hover:bg-slate-100">
                <CheckIcon />
              </div>
            ) : (
              <div className="rounded p-1 duration-100 ease-in hover:bg-slate-100">
                <PencilIcon />
              </div>
            )}
          </button>
        </div>
      </div>

      <div>
        {edit ? (
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="h-28 w-full resize-none overflow-auto rounded bg-slate-100 p-2 outline outline-1 outline-slate-300"
            // defaultValue={content}
            value={content}
          />
        ) : (
          <p className="p-2">{content}</p>
        )}
      </div>
    </div>
  );
};

export default EditBlogPost;

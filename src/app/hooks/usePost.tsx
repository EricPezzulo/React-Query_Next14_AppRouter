import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

// Fetch Blog Posts
export function useFetchPosts() {
  return useQuery({ queryKey: ["posts"], queryFn: getPosts });
}

export const getPosts = async () => {
  const res = await fetch(`/api/blog/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

// Fetch Single Post
export function useFetchPost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => await getPost(postId),
  });
}
const getPost = async (postId: number) => {
  const res = await fetch(`/api/blog/${postId}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Error fetching post with ID ${postId}: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
};

// Mutate Blog Post
export function useEditPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

interface PostTypes {
  postId: number;
  title?: string;
  content?: string;
}
const editPost = async ({ postId, title, content }: PostTypes) => {
  console.log(postId, title);
  await fetch(`/api/blog/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, postId, content }),
  });
};
export function useFetchPostsSSR(){
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
};

import { useQuery } from "@tanstack/react-query";

export default function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: getPosts });
}

const getPosts = async () => {
  const res = await fetch(`/api/blog/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = res.json();
  return data;
};

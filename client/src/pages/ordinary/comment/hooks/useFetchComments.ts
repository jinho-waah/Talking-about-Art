import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPostId } from "../api";
import { Comment } from "../../types";

export const useFetchComments = (postId: string, userId: number) => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", postId, userId],
    queryFn: () => fetchCommentsByPostId(postId, userId),
    refetchOnWindowFocus: true,
  });
};

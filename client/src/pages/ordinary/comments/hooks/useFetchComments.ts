import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPostId } from "../api";
import { Comment } from "../../types";
import { QUERY_KEY } from "@/constants";

export const useFetchComments = (postId: string, userId: number) => {
  return useQuery<Comment[], Error>({
    queryKey: [QUERY_KEY.COMMENTS, postId, userId],
    queryFn: () => fetchCommentsByPostId(postId, userId),
    refetchOnWindowFocus: true,
  });
};

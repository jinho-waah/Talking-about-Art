import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { LikeOptions } from "../types";
import { like } from "../api";

interface LikeProps {
  queryKey: object;
}
export const useLike = (
  setIsLiked: Dispatch<SetStateAction<boolean>>,
  queryKey: LikeProps["queryKey"]
) => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: (options: LikeOptions) => {
      const {
        userId,
        postId = null,
        curatorPostId = null,
        commentId = null,
      } = options;
      return like(userId, postId, curatorPostId, commentId);
    },
    onSuccess: (response: AxiosResponse<{ isLiked: boolean }>) => {
      setIsLiked(response.data.isLiked);
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      console.error("Error toggling like status:", error);
    },
  });

  return likeMutation;
};

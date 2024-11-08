import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { LikeOptions } from "../types";
import { like } from "../api";

export const useLike = (
  isLiked: boolean,
  setIsLiked: Dispatch<SetStateAction<boolean>>,
  setLikeCount: Dispatch<SetStateAction<number>>,
  queryKey: object
) => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: (options: LikeOptions) => {
      const {
        userId,
        ordinaryPostId = null,
        curatorPostId = null,
        commentId = null,
      } = options;
      return like(userId, ordinaryPostId, curatorPostId, commentId);
    },

    onMutate: async () => {
      await queryClient.cancelQueries(queryKey);
      setIsLiked((prev) => !prev);
      if (isLiked) {
        setLikeCount((prev) => prev - 1);
      } else if (!isLiked) {
        setLikeCount((prev) => prev + 1);
      }
    },

    onSuccess: (response: AxiosResponse<{ isLiked: boolean }>) => {
      setIsLiked(response.data.isLiked);
    },
    onError: (error) => {
      console.error("Error toggling like status:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return likeMutation;
};

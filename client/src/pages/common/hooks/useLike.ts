import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeOptions } from "../types";
import { like } from "../api";

export const useLike = (queryKey: object) => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: ({
      options,
      isLiked,
    }: {
      options: LikeOptions;
      isLiked: boolean;
    }) => {
      const {
        userId,
        ordinaryPostId = null,
        curatorPostId = null,
        commentId = null,
      } = options;
      return like(userId, ordinaryPostId, curatorPostId, commentId, isLiked);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey);
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

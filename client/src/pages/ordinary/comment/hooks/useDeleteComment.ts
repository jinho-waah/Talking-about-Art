import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentById } from "../api";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteCommentById(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });
};

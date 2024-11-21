import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentById } from "../api";
import { QUERY_KEY } from "@/constants";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteCommentById(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMMENTS] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });
};

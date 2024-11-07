import { useMutation } from "@tanstack/react-query";
import { updateCommentById } from "../api";
import { UpdateComment } from "../../types";

export const useUpdateComment = (refetchComments: () => void) => {
  return useMutation({
    mutationFn: ({ commentId, content, userId, file }: UpdateComment) =>
      updateCommentById(commentId, content, userId, file),
    onSuccess: () => {
      refetchComments();
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
    },
  });
};

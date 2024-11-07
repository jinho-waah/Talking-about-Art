import { useMutation } from "@tanstack/react-query";
import { postComment } from "../api";

export const usePostComment = (
  id: string,
  onSuccessCallback: () => void,
  onErrorCallback: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: (formData: FormData) => postComment(id, formData),
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });
};

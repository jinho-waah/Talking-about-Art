import { pageRoutes } from "@/apiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateOrdinaryPost } from "../api";
import { UpdateOrdinaryPostProps } from "../../types";
import { QUERY_KEY } from "@/constants";

export const useUpdateOrdinaryPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, updatedPost }: UpdateOrdinaryPostProps) =>
      updateOrdinaryPost({ id, updatedPost }),
    onSuccess: (_, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDINARYPOST, id] });
      alert("글이 성공적으로 수정되었습니다!");
      navigate(pageRoutes.ordinaryPost.replace(":id", id));
    },
    onError: () => {
      alert("글 수정 중 오류가 발생했습니다.");
    },
  });
};

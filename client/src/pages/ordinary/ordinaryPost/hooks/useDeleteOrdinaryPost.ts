import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { deleteOrdinaryPostById } from "../api";
import { QUERY_KEY } from "@/constants";

export const useDeleteOrdinaryPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => deleteOrdinaryPostById(id),
    onSuccess: () => {
      alert("게시물이 성공적으로 삭제되었습니다.");
      navigate(pageRoutes.ordinaryList);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDINARYPOST] });
    },
    onError: () => alert("삭제 중 오류가 발생했습니다."),
  });
};

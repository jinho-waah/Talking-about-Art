import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { postOrdinaryPost } from "../api";

export const usePostOrdinaryPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postOrdinaryPost,
    onSuccess: () => {
      alert("게시물이 성공적으로 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["ordinaryPosts"] });
      navigate(pageRoutes.ordinaryList);
    },
    onError: (error) => {
      console.error("게시물 생성 중 오류가 발생했습니다.", error);
      alert("게시물 생성 중 오류가 발생했습니다.");
    },
  });
};

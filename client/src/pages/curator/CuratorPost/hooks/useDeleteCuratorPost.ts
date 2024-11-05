import { pageRoutes } from "@/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteCuratorPost } from "../api";

export const useDeleteCuratorPost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (postId: string | undefined) => deleteCuratorPost(postId),
    onSuccess: () => {
      alert("게시물이 성공적으로 삭제되었습니다.");
      navigate(pageRoutes.curatorList);
    },
    onError: () => {
      alert("게시물 삭제에 실패했습니다.");
      console.error("Error deleting curator post");
    },
  });
};

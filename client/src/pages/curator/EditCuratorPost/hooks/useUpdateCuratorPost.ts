import { useMutation } from "@tanstack/react-query";
import { updateCuratorPost } from "../api";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

export const useUpdateCuratorPost = (id: string | undefined) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updatedPost: {
      show_id: number;
      title: string;
      content: string;
      updated_at: string;
    }) => updateCuratorPost(id, updatedPost),
    onSuccess: () => {
      alert("글이 성공적으로 수정되었습니다!");
      navigate(pageRoutes.curatorPost.replace(":id", id!));
    },
    onError: () => {
      alert("글 수정에 실패했습니다.");
    },
  });
};

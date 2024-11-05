import { useMutation } from "@tanstack/react-query";
import { addCuratorPost } from "../api";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

export const useAddCuratorPost = (
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setShowId: React.Dispatch<React.SetStateAction<number | undefined>>
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addCuratorPost,
    onSuccess: () => {
      alert("글이 성공적으로 업로드되었습니다!");
      setTitle("");
      setContent("");
      setShowId(undefined);
      localStorage.removeItem("title");
      localStorage.removeItem("content");
      navigate(pageRoutes.curatorList);
    },
    onError: () => {
      alert("글 업로드에 실패했습니다.");
    },
  });
};

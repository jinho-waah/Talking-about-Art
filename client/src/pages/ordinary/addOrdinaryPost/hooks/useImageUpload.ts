import { useMutation } from "@tanstack/react-query";
import { postOrdinaryPostImage } from "../api";

export const useImageUpload = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await postOrdinaryPostImage(formData);
      return data.imageUrl;
    },
    onError: (error) => {
      console.error("Error uploading images:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    },
  });
};

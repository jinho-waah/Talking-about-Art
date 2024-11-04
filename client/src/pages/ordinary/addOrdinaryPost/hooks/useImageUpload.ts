// hooks/useImageUpload.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_DOMAIN } from "@/constants";

export const useImageUpload = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(
        `${SERVER_DOMAIN}api/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.imageUrl;
    },
    onError: (error) => {
      console.error("Error uploading images:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    },
  });
};

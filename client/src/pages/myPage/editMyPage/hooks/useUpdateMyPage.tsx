import { useMutation } from "@tanstack/react-query";
import { postUploadAvatarImage, putMyPage } from "../api";
import { ProfileData } from "../../types";

export const useUpdateMyPage = (
  userId: number | null,
  localProfileData: ProfileData,
  selectedFile: File | null,
  setImgUrl: (url: string) => void,
  navigate: (path: string) => void
) => {
  const uploadAvatar = async (): Promise<string | null> => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await postUploadAvatarImage(userId, formData);
      return response.data.filePath;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  return useMutation({
    mutationFn: async (updatedProfileData: ProfileData) => {
      let avatarPath = localProfileData.avatarSrc;
      if (selectedFile) {
        const uploadedAvatarPath = await uploadAvatar();
        if (uploadedAvatarPath) {
          avatarPath = uploadedAvatarPath;
          setImgUrl(uploadedAvatarPath);
        } else {
          throw new Error("프로필 이미지 업로드 중 오류 발생");
        }
      }

      await putMyPage(userId, updatedProfileData, avatarPath);
    },
    onSuccess: () => {
      navigate(`/mypage/${userId}`);
    },
    onError: (error) => {
      console.error("프로필 업데이트 중 오류 발생:", error);
    },
  });
};

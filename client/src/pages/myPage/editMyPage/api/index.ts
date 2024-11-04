import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { ProfileData } from "../../types";

export const postUploadAvatarImage = async (
  userId: number | null,
  formData: FormData
) => {
  return await axios.post(
    `${SERVER_DOMAIN}api/upload/avatar/${userId}`,
    formData,
    {
      withCredentials: true,
    }
  );
};

export const putMyPage = async (
  userId: number | null,
  profileData: ProfileData,
  avatarPath: string
) => {
  return await axios.put(
    `${SERVER_DOMAIN}api/mypage/${userId}`,
    {
      nickname: profileData.nickname,
      bio: profileData.bio,
      website: profileData.website,
      x: profileData.x,
      instagram: profileData.instagram,
      thread: profileData.thread,
      profile_image: avatarPath,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

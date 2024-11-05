import { useQuery } from "@tanstack/react-query";
import { getMyPageByUserId } from "../../api";
import { ProfileData } from "../../types";

export const useFetchMyPage = (userId: number | null) => {
  return useQuery<ProfileData, Error>({
    queryKey: ["myPage", userId],
    queryFn: async () => {
      const response = await getMyPageByUserId(userId);
      return {
        avatarSrc: response.data.profile_image || "",
        nickname: response.data.nickname || "",
        bio: response.data.bio || "",
        website: response.data.website || "",
        x: response.data.x || "",
        instagram: response.data.instagram || "",
        thread: response.data.thread || "",
      };
    },
    enabled: !!userId,
  });
};

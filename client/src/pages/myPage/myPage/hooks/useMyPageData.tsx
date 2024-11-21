import { useQuery } from "@tanstack/react-query";
import { getMyPageByUserId } from "../../api";
import { ProfileData } from "../../types";
import { QUERY_KEY } from "@/constants";

export const useMyPageData = (pageId: number | null) => {
  return useQuery<ProfileData, Error>({
    queryKey: [QUERY_KEY.MYPAGE, pageId],
    queryFn: async () => {
      if (!pageId) {
        throw new Error("유효한 페이지 ID가 필요합니다.");
      }
      const response = await getMyPageByUserId(pageId);
      return {
        avatarSrc: response.data.profile_image,
        nickname: response.data.nickname,
        bio: response.data.bio,
        website: response.data.website,
        x: response.data.x,
        instagram: response.data.instagram,
        thread: response.data.thread,
      };
    },
    enabled: !!pageId,
  });
};

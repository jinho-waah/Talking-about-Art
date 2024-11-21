import { QUERY_KEY } from "@/constants";
import { Like } from "@/pages/common/components/Like";

export const useToggleLike = (
  curatorPostId?: number,
  userId?: number | null
) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike } = Like({
    queryKey: [QUERY_KEY.CURATORPOST, curatorPostId, userId],
  });

  const handleLikeToggle = async () => {
    if (!curatorPostId || !userId) return;
    toggleLike({ userId, curatorPostId });
  };
  return { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle };
};

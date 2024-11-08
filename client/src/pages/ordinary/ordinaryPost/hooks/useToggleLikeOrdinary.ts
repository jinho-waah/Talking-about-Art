import { Like } from "@/pages/common/components/Like";

export const useToggleLikeOrdinary = (
  ordinaryPostId?: number,
  userId?: number | null
) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike } = Like({
    queryKey: ["ordinaryPost", ordinaryPostId, userId],
  });
  const handleLikeToggle = async () => {
    if (!ordinaryPostId || !userId) return;
    toggleLike({ userId, ordinaryPostId });
  };

  return { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle };
};

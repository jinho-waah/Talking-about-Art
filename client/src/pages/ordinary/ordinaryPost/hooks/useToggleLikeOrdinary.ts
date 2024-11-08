import { Like } from "@/pages/common/components/Like";

export const useToggleLikeOrdinary = (
  postId?: number,
  userId?: number | null
) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike } = Like({
    queryKey: ["ordinaryPost", postId, userId],
  });
  const handleLikeToggle = async () => {
    if (!postId || !userId) return;
    toggleLike({ userId, postId });
  };

  return { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle };
};

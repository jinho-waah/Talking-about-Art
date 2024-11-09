import { Like } from "@/pages/common/components/Like";

export const useToggleLikeComment = (
  commentId?: number,
  userId?: number | null
) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike } = Like({
    queryKey: ["comments", commentId, userId],
  });
  const handleLikeToggle = async () => {
    if (!commentId || !userId) return;
    toggleLike({ userId, commentId });
  };

  return { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle };
};
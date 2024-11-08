import { Like } from "@/pages/common/components/Like";

export const useToggleLike = (
  curatorPostId?: number,
  userId?: number | null,
  id?: string | undefined
) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike } = Like({
    queryKey: ["curatorPost", curatorPostId],
  });

  const handleLikeToggle = async () => {
    if (!curatorPostId || !userId || !id) return;
    toggleLike({ userId, curatorPostId });
  };
  return { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle };
};

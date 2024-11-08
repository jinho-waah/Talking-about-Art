import { Like } from "@/pages/common/components/Like";

type TargetType = "ordinaryPost" | "comments" | "curatorPost";

interface UseToggleLikeProps {
  targetType: TargetType;
  targetId: number | undefined;
  userId: number | null;
}

export const useToggleLike = ({
  targetType,
  targetId,
  userId,
}: UseToggleLikeProps) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike } = Like({
    queryKey: [targetType, targetId, userId],
  });

  const handleLikeToggle = async () => {
    if (!targetId || !userId) return;
    const options: {
      userId: number;
      ordinaryPostId?: number;
      curatorPostId?: number;
      commentId?: number;
    } = { userId };

    if (targetType === "ordinaryPost") {
      options.ordinaryPostId = targetId;
    } else if (targetType === "curatorPost") {
      options.curatorPostId = targetId;
    } else if (targetType === "comments") {
      options.commentId = targetId;
    }
    toggleLike(options);
  };

  return { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle };
};

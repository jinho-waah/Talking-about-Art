import { Like } from "@/pages/common/components/Like";

export const useToggleLike = (
  curatorPostId?: number,
  userId?: number | null,
  id?: string | undefined
) => {
  const { toggleLike } = Like({ queryKey: ["curatorPost", curatorPostId] });

  const handleLikeToggle = async () => {
    if (!curatorPostId || !userId || !id) return;
    toggleLike({ userId, curatorPostId });
  };

  return { handleLikeToggle };
};

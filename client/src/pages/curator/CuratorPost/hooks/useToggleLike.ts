import { useQueryClient } from "@tanstack/react-query";
import { useLike } from "@/pages/common/hooks/useLike";

export const useToggleLike = (
  curatorPostId?: number,
  userId?: number | null,
  id?: string | undefined
) => {
  const { toggleLike } = useLike();
  const queryClient = useQueryClient();

  const handleLikeToggle = async () => {
    if (!curatorPostId || !userId || !id) return;
    await toggleLike({ userId, curatorPostId });
    queryClient.invalidateQueries({ queryKey: ["curatorPost", id, userId] });
  };

  return { handleLikeToggle };
};

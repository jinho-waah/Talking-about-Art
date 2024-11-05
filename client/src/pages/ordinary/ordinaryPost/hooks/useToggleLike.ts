import { useQueryClient } from "@tanstack/react-query";
import { useLike } from "@/components/common/hooks/useLike";

export const useToggleLike = (
  postId?: number,
  userId?: number | null,
  id?: string | undefined
) => {
  const { toggleLike } = useLike();
  const queryClient = useQueryClient();

  const handleLikeToggle = async () => {
    if (!postId || !userId || !id) return;
    await toggleLike({ userId, postId });
    queryClient.invalidateQueries({ queryKey: ["ordinaryPost", id, userId] });
  };

  return { handleLikeToggle };
};

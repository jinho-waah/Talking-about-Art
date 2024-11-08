import { useQueryClient } from "@tanstack/react-query";
import { Like } from "@/pages/common/components/Like";

export const useToggleLike = (
  postId?: number,
  userId?: number | null,
  id?: string | undefined
) => {
  const { toggleLike } = Like();
  const queryClient = useQueryClient();

  const handleLikeToggle = async () => {
    if (!postId || !userId || !id) return;
    await toggleLike({ userId, postId });
    queryClient.invalidateQueries({ queryKey: ["ordinaryPost", id, userId] });
  };

  return { handleLikeToggle };
};

import { useState } from "react";
import { LikeOptions } from "../types";
import { useLike } from "../hooks/useLike";

interface LikeProps {
  queryKey: object;
}

export const Like = ({ queryKey }: LikeProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const likeMutation = useLike(setIsLiked, queryKey);

  const toggleLike = async (options: LikeOptions) => {
    likeMutation.mutate(options);
  };

  return { isLiked, toggleLike };
};

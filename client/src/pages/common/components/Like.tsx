import { useState } from "react";
import { LikeOptions } from "../types";
import { useLike } from "../hooks/useLike";

interface LikeProps {
  queryKey: object;
}

export const Like = ({ queryKey }: LikeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const likeMutation = useLike(isLiked, setIsLiked, setLikeCount, queryKey);

  const toggleLike = async (options: LikeOptions) => {
    likeMutation.mutate(options);
  };
  return { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike };
};

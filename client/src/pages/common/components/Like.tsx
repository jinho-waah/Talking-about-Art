import { useCallback, useState } from "react";
import { LikeOptions } from "../types";
import { useLike } from "../hooks/useLike";
import { debounce } from "lodash";

interface LikeProps {
  queryKey: object;
}

export const Like = ({ queryKey }: LikeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const likeMutation = useLike(queryKey);

  const debouncedToggleLikeServer = useCallback(
    debounce((options: LikeOptions, updatedIsLiked: boolean) => {
      likeMutation.mutate({ options, isLiked: updatedIsLiked });
    }, 300),
    []
  );

  const toggleLike = (options: LikeOptions) => {
    const updatedIsLiked = !isLiked;
    setIsLiked(updatedIsLiked);
    setLikeCount((prev) => (updatedIsLiked ? prev + 1 : prev - 1));

    debouncedToggleLikeServer(options, updatedIsLiked);
  };

  return { isLiked, setIsLiked, likeCount, setLikeCount, toggleLike };
};

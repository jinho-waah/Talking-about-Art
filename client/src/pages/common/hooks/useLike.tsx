import { useState } from "react";
import { SERVER_DOMAIN } from "@/constants";

interface LikeOptionsBase {
  userId: number;
}
type LikeOptions =
  | (LikeOptionsBase & {
      postId: number;
      curatorPostId?: null;
      commentId?: null;
    })
  | (LikeOptionsBase & {
      curatorPostId: number;
      postId?: null;
      commentId?: null;
    })
  | (LikeOptionsBase & {
      commentId: number;
      postId?: null;
      curatorPostId?: null;
    });

export const useLike = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = async (options: LikeOptions) => {
    const {
      userId,
      postId = null,
      curatorPostId = null,
      commentId = null,
    } = options;

    try {
      const response = await fetch(`${SERVER_DOMAIN}api/likes/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId, curatorPostId, commentId }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked); // 서버에서 받은 좋아요 상태로 업데이트
      } else {
        console.error("Failed to toggle like status.");
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  return { isLiked, toggleLike };
};

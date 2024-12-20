import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const like = async (
  userId: number,
  ordinaryPostId: number | null,
  curatorPostId: number | null,
  commentId: number | null,
  isLiked: boolean
) => {
  return await axios.post<{ isLiked: boolean }>(
    `${SERVER_DOMAIN}api/likes/toggle`,
    {
      userId,
      postId: ordinaryPostId,
      curatorPostId,
      commentId,
      isLiked,
    }
  );
};

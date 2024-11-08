import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const like = async (
  userId: number,
  postId: number | null,
  curatorPostId: number | null,
  commentId: number | null
) => {
  return await axios.post<{ isLiked: boolean }>(
    `${SERVER_DOMAIN}api/likes/toggle`,
    {
      userId,
      postId,
      curatorPostId,
      commentId,
    }
  );
};

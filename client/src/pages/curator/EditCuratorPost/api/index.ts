import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { UpdatedPost } from "../../types";

export const updateCuratorPost = async (
  id: string | undefined,
  updatedPost: UpdatedPost
) => {
  const respose = await axios.put(
    `${SERVER_DOMAIN}api/curatorPosts/${id}`,
    updatedPost
  );
  return respose;
};

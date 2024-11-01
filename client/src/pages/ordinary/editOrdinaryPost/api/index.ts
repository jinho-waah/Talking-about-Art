import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { UpdateOrdinaryPostProps } from "../../types";

export const updateOrdinaryPost = async ({
  id,
  updatedPost,
}: UpdateOrdinaryPostProps) => {
  await axios.put(`${SERVER_DOMAIN}api/ordinaryPosts/${id}`, updatedPost);
};

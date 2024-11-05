import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const deleteCuratorPost = async (id: string | undefined) => {
  const response = await axios.delete(`${SERVER_DOMAIN}api/curatorPosts/${id}`);
  return response;
};

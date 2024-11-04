import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const getExhibitionPost = (id: string | undefined) => {
  return axios.get(`${SERVER_DOMAIN}api/exhibitionPosts/${id}`);
};

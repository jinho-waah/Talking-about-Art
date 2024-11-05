// api.ts
import axios from "axios";
import { SERVER_DOMAIN } from "@/constants";

export const addCuratorPost = (newPost: object) => {
  return axios.post(`${SERVER_DOMAIN}api/curatorPosts`, newPost);
};

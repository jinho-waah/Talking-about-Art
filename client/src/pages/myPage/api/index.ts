import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const getMyPageByUserId = async (pageId: number | null) => {
  return await axios.get(`${SERVER_DOMAIN}api/mypage/${pageId}`);
};

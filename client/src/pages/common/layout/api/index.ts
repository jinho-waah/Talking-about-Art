import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const getAuthStatus = async () => {
  return await axios.get(`${SERVER_DOMAIN}api/auth/status`, {
    withCredentials: true,
  });
};

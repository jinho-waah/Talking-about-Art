import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { FormData, LoginResponse } from "../types";

export const loginRequest = async (
  formData: FormData
): Promise<LoginResponse> => {
  const response = await axios.post(`${SERVER_DOMAIN}api/login`, formData, {
    withCredentials: true,
  });

  return response.data;
};

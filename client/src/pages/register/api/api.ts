import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  role: string;
}

interface EmailCheckResponse {
  isAvailable: boolean;
}

interface RegisterResponse {
  status: number;
  message: string;
}

export const emailCheck = async (
  formData: Pick<RegisterFormData, "email">
): Promise<EmailCheckResponse> => {
  const response = await axios.post<EmailCheckResponse>(
    `${SERVER_DOMAIN}api/check-email`,
    { email: formData.email }
  );
  return response.data;
};

export const registerUser = async (
  formData: RegisterFormData
): Promise<RegisterResponse> => {
  const response = await axios.post(`${SERVER_DOMAIN}api/register`, formData);
  return response.data;
};

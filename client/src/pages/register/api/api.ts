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

export const emailCheck = async (
  formData: Pick<RegisterFormData, "email">
): Promise<EmailCheckResponse> => {
  const response = await axios.post<EmailCheckResponse>(
    `${SERVER_DOMAIN}api/check-email`,
    { email: formData.email }
  );
  return response.data;
};

export const registerUser = async (formData: RegisterFormData) => {
  // 전체 response 객체를 반환
  const response = await axios.post(`${SERVER_DOMAIN}api/register`, formData);
  return response;
};

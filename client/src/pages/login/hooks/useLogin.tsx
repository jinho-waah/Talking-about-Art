import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api";
import { FormData } from "../types";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import authStore from "@/store/authStore";
import { QUERY_KEY } from "@/constants";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setLogin } = authStore().actions;

  return useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: (formData: FormData) => loginRequest(formData),
    onSuccess: (data) => {
      const { userId, galleryId, role, userName, imgUrl } = data;
      setLogin(userId, galleryId, role, userName, imgUrl);
      navigate(pageRoutes.main);
    },
    onError: (error) => {
      console.error("로그인에 실패했습니다.", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

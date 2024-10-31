import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import { pageRoutes } from "@/apiRoutes";
import { RegisterFormData, RegisterResponse } from "../types";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<RegisterResponse, Error, RegisterFormData>({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailCheck"] });
      navigate(pageRoutes.login);
    },
    onError: () => {
      console.error("회원가입에 실패했습니다.");
    },
  });

  return mutation;
};

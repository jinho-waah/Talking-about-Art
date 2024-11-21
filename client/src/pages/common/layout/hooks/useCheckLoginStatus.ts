import { useQueryClient, useMutation } from "@tanstack/react-query";
import authStore from "@/store/authStore";
import { getAuthStatus } from "../api";
import { useEffect } from "react";
import { QUERY_KEY } from "@/constants";

export const useCheckLoginStatus = () => {
  const { isToken } = authStore();
  const { setLogin, setLogout } = authStore().actions;

  const queryClient = useQueryClient();

  const { mutate: checkLoginStatus } = useMutation({
    mutationFn: getAuthStatus,
    onSuccess: (data) => {
      setLogin(
        data.data.id,
        data.data.galleryId,
        data.data.role,
        data.data.userName,
        data.data.imgUrl
      );
    },
    onError: (error) => {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setLogout();
    },
  });

  useEffect(() => {
    if (isToken) {
      checkLoginStatus();
    }
  }, [isToken, checkLoginStatus]);

  return {
    refetchLoginStatus: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTHSTATUS] }),
  };
};

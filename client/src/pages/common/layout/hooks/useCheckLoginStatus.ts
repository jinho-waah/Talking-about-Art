import { useEffect } from "react";
import { SERVER_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";

export const useCheckLoginStatus = () => {
  const { isToken } = authStore();
  const { setLogin, setLogout } = authStore().actions;

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${SERVER_DOMAIN}api/auth/status`, {
        method: "GET",
        credentials: "include", // 쿠키 포함
      });
      if (response.ok) {
        const data = await response.json();
        setLogin(
          data.id,
          data.galleryId,
          data.role,
          data.userName,
          data.imgUrl
        );
      } else if (response.status === 401 || response.status === 403) {
        setLogout();
      } else {
        console.error("로그인 상태 확인 실패:", response.statusText);
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setLogout();
    }
  };

  useEffect(() => {
    if (isToken === true) {
      checkLoginStatus();
    }
  }, [isToken]);
};

import { useEffect } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";

export const useCheckLoginStatus = () => {
  const { isToken } = authStore();
  const { setLogin, setLogout } = authStore().actions;

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}api/auth/status`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        setLogin(
          data.id,
          data.galleryId,
          data.role,
          data.userName,
          data.imgUrl
        );
      }
      if (response && (response.status === 401 || response.status === 403)) {
        setLogout();
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (isToken === true) {
      checkLoginStatus();
    }
  }, [isToken]);
};

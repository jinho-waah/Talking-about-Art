import { useEffect } from "react";
import { ReactNode } from "react";
import { Header } from "./Header";
import { DOMAIN } from "@/constants";
import authStore from "@/store/authStore";

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName,
}) => {
  const { isToken } = authStore();
  const { setLogin, setLogout } = authStore().actions;

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${DOMAIN}api/auth/status`, {
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
        ); // 로그인 상태 유지
      } else if (response.status === 401) {
        setLogout(); // 로그아웃 처리
      } else if (response.status === 403) {
        setLogout(); // 토큰 유효하지 않은 경우 로그아웃 처리
      } else {
        console.error("로그인 상태 확인 실패:", response.statusText);
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setLogout(); // 오류 발생 시 로그아웃 처리
    }
  };

  // 컴포넌트가 마운트될 때 토큰이 존재하면 로그인 상태를 확인
  useEffect(() => {
    if (isToken === true) {
      checkLoginStatus();
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

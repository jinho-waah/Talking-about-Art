import { useEffect } from "react";
import { ReactNode } from "react";
import { Header } from "./Header";
import { domain } from "@/constants";
import authStore from "@/store/authStore";

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName,
}) => {
  const { isLogin } = authStore();
  const { setLogin, setLogout } = authStore().actions;

  // 컴포넌트가 마운트될 때 로그인 상태를 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${domain}api/auth/status`, {
          method: "GET",
          credentials: "include", // 쿠키 포함
        });

        if (response.ok) {
          const data = await response.json();
          setLogin(data.id, data.role); // 로그인 상태 유지
        } else {
          setLogout(); // 로그아웃 상태로 설정
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        setLogout();
      }
    };
    if (!isLogin) {
      checkLoginStatus();
      console.log("checking");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen ">
        <main className="flex-grow">
          <div className={`container mx-auto px-4 ${containerClassName}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

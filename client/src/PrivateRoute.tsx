import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";

type PrivateRouteProps = {
  allowedRoles: string[];
  children: JSX.Element;
};

const PrivateRoute = ({ allowedRoles, children }: PrivateRouteProps) => {
  const { role, userId } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !allowedRoles.includes(role || "")) {
      alert("해당 페이지에 접근 권한이 없습니다");
      navigate(pageRoutes.main);
    }
  }, [role, userId, allowedRoles, navigate]);

  return children;
};

export default PrivateRoute;

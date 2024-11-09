import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { UserAvatar } from "@/pages/common/layout/components/UserAvatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import NavigationBar from "./NavigationBar";
import { pageRoutes } from "@/apiRoutes";
import authStore from "@/store/authStore";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId, userName, imgUrl } = authStore();
  const handleLogo = () => {
    navigate("/");
  };
  const handleAvatar = () => {
    navigate(`${pageRoutes.myPage}/${userId}`);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1
          onClick={handleLogo}
          className="text-xl md:text-2xl font-bold cursor-pointer"
        >
          Talking about Art
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          {userName && (
            <div onClick={handleAvatar}>
              <UserAvatar userName={userName} imgUrl={imgUrl} />
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5" /> // 메뉴 열렸을 때 X 버튼으로 변경
            ) : (
              <Menu className="h-5 w-5" /> // 메뉴 닫혔을 때 메뉴 아이콘
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && <NavigationBar toggleMenu={toggleMenu} />}
    </header>
  );
};

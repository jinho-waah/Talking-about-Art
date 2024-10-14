import { Button } from "@/components/ui/button";
import { X, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

interface NavigationBarProps {
  toggleMenu: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const handleToHome = () => {
    navigate("/");
    toggleMenu();
  };
  const handleToUpCommingList = () => {
    navigate("/upcomminglist");
    toggleMenu();
  };
  const handleToIntroduceList = () => {
    navigate("/introducelist");
    toggleMenu();
  };
  const handleToCuratorList = () => {
    navigate(pageRoutes.curatorList);
    toggleMenu();
  };
  const handleToPostList = () => {
    navigate(pageRoutes.postList);
    toggleMenu();
  };
  return (
    <nav className="fixed top-0 right-0 h-full w-2/5 bg-white shadow-md z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="absolute top-4 right-4"
      >
        <X className="h-6 w-6" />
      </Button>
      <div className="container mx-auto px-4 py-6">
        <ul className="space-y-4">
          <li>
            <Button onClick={handleToHome} variant="ghost" className="text-xl">
              Home
            </Button>
          </li>
          <li>
            <Button
              onClick={handleToUpCommingList}
              variant="ghost"
              className="text-xl"
            >
              전시 예정
            </Button>
          </li>
          <li>
            <Button
              onClick={handleToIntroduceList}
              variant="ghost"
              className="text-xl"
            >
              전시 소개
            </Button>
          </li>
          <li>
            <Button
              onClick={handleToCuratorList}
              variant="ghost"
              className="text-xl"
            >
              큐레이터
            </Button>
          </li>
          <li>
            <Button
              onClick={handleToPostList}
              variant="ghost"
              className="text-xl"
            >
              게시물
            </Button>
          </li>
          <Separator className="my-4" />
          <li>
            <Button
              onClick={toggleMenu}
              variant="ghost"
              className="justify-start text-red-500 hover:text-red-600 hover:bg-red-100 text-lg"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;

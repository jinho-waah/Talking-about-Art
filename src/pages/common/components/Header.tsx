import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogo = () => {
    navigate("/");
  };
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 onClick={handleLogo} className="text-xl md:text-2xl font-bold">
          Talking about Art
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Input
            className="w-64 hidden md:block"
            placeholder="Search exhibitions, artists, or topics"
          />
          <UserAvatar />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

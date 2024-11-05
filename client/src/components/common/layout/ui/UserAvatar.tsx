import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface UserAvatarProps {
  userName: string;
  imgUrl: string | null;
}

export const UserAvatar = ({ userName, imgUrl }: UserAvatarProps) => {
  const [currentImgUrl, setCurrentImgUrl] = useState(imgUrl);

  useEffect(() => {
    setCurrentImgUrl(imgUrl);
  }, [imgUrl]);

  return (
    <Avatar>
      <AvatarImage src={currentImgUrl || undefined} alt="User" />
      <AvatarFallback>{userName && userName[0]}</AvatarFallback>
    </Avatar>
  );
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import authStore from "@/store/authStore";
import { useEffect, useState } from "react";

export const UserAvatar = () => {
  const { userName, imgUrl } = authStore();
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

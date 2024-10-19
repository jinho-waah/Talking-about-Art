import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import authStore from "@/store/authStore";

export const UserAvatar = () => {
  const { userName, imgUrl } = authStore();
  return (
    <Avatar>
      <AvatarImage src={imgUrl || undefined} alt="User" />
      <AvatarFallback>{userName && userName[0]}</AvatarFallback>
    </Avatar>
  );
};

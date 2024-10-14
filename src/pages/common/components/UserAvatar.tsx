import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
  );
};

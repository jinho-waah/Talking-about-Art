import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PostHeaderProps {
  authorName: string;
  createdAt: string;
}

export default function PostHeader({ authorName, createdAt }: PostHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarFallback>{authorName[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{authorName}</p>
        <p className="text-sm text-muted-foreground">{createdAt}</p>
      </div>
    </div>
  );
}

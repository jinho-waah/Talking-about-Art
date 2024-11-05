import { FormatDate } from "@/lib/utils";
import { UserAvatar } from "@/components/common/layout/ui/UserAvatar";

interface PostHeaderProps {
  authorName: string;
  profileImage: string;
  createdAt?: string;
  period?: string;
}

export default function PostHeader({
  authorName,
  profileImage,
  createdAt,
  period,
}: PostHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <UserAvatar userName={authorName} imgUrl={profileImage}></UserAvatar>
      <div>
        <p className="font-medium">{authorName}</p>
        {period ? (
          <p className="text-sm text-muted-foreground">{period}</p>
        ) : createdAt ? (
          <p className="text-sm text-muted-foreground">
            {FormatDate(createdAt)}
          </p>
        ) : null}
      </div>
    </div>
  );
}

import { FormatDate } from "@/lib/utils";
import { UserAvatar } from "@/pages/common/layout/ui/UserAvatar";

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
  let displayText;
  if (period) {
    displayText = period;
  } else if (createdAt) {
    displayText = FormatDate(createdAt);
  }

  return (
    <div className="flex items-center space-x-4">
      <UserAvatar userName={authorName} imgUrl={profileImage} />
      <div>
        <p className="font-medium">{authorName}</p>
        {displayText && (
          <p className="text-sm text-muted-foreground">{displayText}</p>
        )}
      </div>
    </div>
  );
}

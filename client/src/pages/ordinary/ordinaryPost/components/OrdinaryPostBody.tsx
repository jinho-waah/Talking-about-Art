import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThumbsUp, MessageSquare, Share2, Ellipsis } from "lucide-react";
import { UserAvatar } from "@/pages/common/layout/components/UserAvatar";
import { FormatDate } from "@/lib/utils";
import { OrdinaryPost } from "../../types";

interface OrdinaryPostCardProps {
  post: OrdinaryPost;
  userId: number | null;
  role: string | null;
  isLiked: boolean;
  likeCount: number;
  toggleModal: () => void;
  handleLikeToggle: () => void;
  scrollToComments: () => void;
}

export default function OrdinaryPostBody({
  post,
  userId,
  role,
  isLiked,
  likeCount,
  toggleModal,
  handleLikeToggle,
  scrollToComments,
}: OrdinaryPostCardProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <UserAvatar
              userName={post.author_name}
              imgUrl={post.profile_image}
            />
            <div>
              <p className="font-medium">{post.author_name}</p>
              <p className="text-sm text-muted-foreground">
                {FormatDate(post.created_at)}
              </p>
            </div>
          </div>
          {(userId == post.author_id || role === "admin") && (
            <Button variant="ghost" size="icon" onClick={toggleModal}>
              <Ellipsis />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="ml-2">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={handleLikeToggle}>
            <ThumbsUp
              className={`mr-2 h-4 w-4 ${isLiked ? "text-blue-500" : ""}`}
            />
            좋아요 {likeCount}
          </Button>
          <Button variant="ghost" size="sm" onClick={scrollToComments}>
            <MessageSquare className="mr-2 h-4 w-4" />
            댓글 {post.comment_count}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

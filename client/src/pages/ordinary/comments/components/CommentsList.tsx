import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThumbsUp, Share2, Flag, Ellipsis } from "lucide-react";
import { UserAvatar } from "@/pages/common/layout/ui/UserAvatar";
import { FormatDate } from "@/lib/utils";
import { CommentEditForm } from "./CommentEditForm";
import { Comment } from "../../types";
import { HOST_DOMAIN } from "@/constants";
import { useEffect } from "react";
import { useToggleLike } from "@/pages/common/hooks/useToggleLike";

interface CommentProps {
  comment: Comment;
  userId: number | null;
  role: string | null;
  editCommentId: number | null;
  editContent: string;
  setEditContent: (content: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  saveEdit: (commentId: number) => void;
  toggleModal: (commentId: number | null) => void;
  handleCancelEdit: () => void;
}

export const CommentsList = ({
  comment,
  userId,
  role,
  editCommentId,
  editContent,
  setEditContent,
  handleFileChange,
  previewUrl,
  saveEdit,
  toggleModal,
  handleCancelEdit,
}: CommentProps) => {
  const { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle } =
    useToggleLike({
      targetType: "comments",
      targetId: comment?.id,
      userId: userId,
    });

  useEffect(() => {
    setIsLiked(comment.isLiked == true);
    setLikeCount(comment.like_count);
  }, [comment]);

  return (
    <Card key={comment.id} className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserAvatar
              userName={comment.nickname}
              imgUrl={comment.profile_image}
            />
            <div>
              <p className="font-medium">{comment.nickname}</p>
              <p className="text-sm text-muted-foreground">
                {FormatDate(comment.created_at)}
              </p>
            </div>
          </div>
          {(userId === comment.user_id || role === "admin") && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleModal(comment.id)}
            >
              <Ellipsis />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="ml-2">
        {editCommentId === comment.id ? (
          <CommentEditForm
            editContent={editContent}
            setEditContent={setEditContent}
            handleFileChange={handleFileChange}
            previewUrl={previewUrl}
            saveEdit={saveEdit}
            commentId={comment.id}
            handleCancelEdit={handleCancelEdit}
          />
        ) : (
          <>
            {comment.file_url && (
              <div className="mt-2 mb-4">
                <img
                  src={`${HOST_DOMAIN}${comment.file_url}`}
                  alt="첨부 이미지"
                  className="max-w-[200px] h-auto rounded-md"
                />
              </div>
            )}
            <p>{comment.content}</p>
          </>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={handleLikeToggle}>
            <ThumbsUp
              className={`mr-2 h-4 w-4 ${isLiked ? "text-blue-500" : ""}`}
            />
            좋아요 {likeCount}
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="mr-2 h-4 w-4" />
            신고
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

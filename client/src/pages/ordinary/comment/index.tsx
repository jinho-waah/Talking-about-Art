import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, Share2, Flag } from "lucide-react";
import CommentsForm from "./CommentForm";
import { DOMAIN } from "@/constants"; // 서버 도메인을 상수로 관리한다고 가정

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  nickname: string;
  content: string;
  like_count: number;
  created_at: string;
  profile_image?: string; // 프로필 이미지가 있는 경우
}

export default function Comments() {
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${DOMAIN}api/post/comment/${id}`);
        if (!response.ok) {
          throw new Error("댓글을 불러오는 데 실패했습니다.");
        }
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">댓글</h2>
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                {comment.profile_image ? (
                  <img
                    src={comment.profile_image}
                    alt={`${comment.nickname}'s profile`}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <AvatarFallback>
                    {comment.nickname
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{comment.nickname}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{comment.content}</p>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                좋아요 {comment.like_count}
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
      ))}
      <CommentsForm />
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Share2, Ellipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // 모달 컴포넌트 추가
import { useNavigate, useParams } from "react-router-dom";
import { DOMAIN } from "@/constants";
import Comments from "./comment";
import authStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";

interface OrdinaryPost {
  id: number;
  author_id: number;
  author_name: string;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string; // ISO 형식의 날짜 문자열
}

export default function OrdinaryPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<OrdinaryPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const { userId, role } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrdinaryPost();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchOrdinaryPost = async () => {
    try {
      const response = await fetch(`${DOMAIN}api/ordinaryPosts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("Failed to fetch ordinary post");
      }
    } catch (error) {
      console.error("Error fetching ordinary post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`${DOMAIN}api/curatorP/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("게시물이 성공적으로 삭제되었습니다.");
          navigate(pageRoutes.curatorList);
        } else {
          alert("게시물 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting curator post:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = () => {
    if (id) {
      navigate(pageRoutes.editOrdinaryPost.replace(":id", id));
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!post) return <>Loading...</>;

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{post.author_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.created_at)}
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
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.content}</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                좋아요 {post.like_count}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                댓글 {post.comment_count}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                공유
              </Button>
            </div>
          </CardContent>
        </Card>
        <Comments />

        <Dialog open={isModalOpen} onOpenChange={toggleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>게시물 옵션</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" onClick={handleEdit}>
                수정하기
              </Button>
              <Button variant="outline" onClick={handleDelete}>
                삭제하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

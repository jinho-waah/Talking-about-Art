import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, Share2, Ellipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // 모달 컴포넌트 추가
import { useParams, useNavigate } from "react-router-dom";
import { SERVER_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";

interface CuratorPostData {
  id: number;
  title: string;
  content: string;
  curator_name: string;
  curator_id: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  show_name: string;
  show_term_start: string | null;
  show_term_end: string | null;
  show_place: string | null;
  show_price: number;
  show_link: string;
  show_place_detail: string | null;
  business_hours: string;
}

export default function CuratorPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<CuratorPostData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const { userId, role } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCuratorPost();
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

  const fetchCuratorPost = async () => {
    try {
      const response = await fetch(`${SERVER_DOMAIN}api/curatorPosts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("Failed to fetch curator post");
      }
    } catch (error) {
      console.error("Error fetching curator post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`${SERVER_DOMAIN}api/curatorPosts/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("게시물이 성공적으로 삭제되었습니다.");
          navigate(pageRoutes.curatorList); // 게시물 목록 페이지로 이동
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
      navigate(pageRoutes.editCuratorPost.replace(":id", id));
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleToSite = () => {
    window.open(post.show_link, "_blank");
  };

  const businessHours = JSON.parse(post.business_hours);

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5 ml-1">큐레이터의 전시 이야기</h1>
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{post.curator_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.curator_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </div>
              {(userId == post.curator_id || role === "admin") && (
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
                {post.like_count}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                공유
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            {(userId == post.curator_id || role === "admin") && (
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
            )}
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 ml-1">전시 정보</h2>
        <Card>
          <CardContent className="grid gap-4 md:grid-cols-2 mt-6">
            <div>
              <h3 className="font-semibold mb-2">전시 이름</h3>
              <p className="text-muted-foreground">{post.show_name}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">전시 위치</h3>
              <p className="text-muted-foreground">{post.show_place}</p>
              <p className="text-muted-foreground">{post.show_place_detail}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">운영 기간</h3>
              {post.show_term_end ? (
                <p className="text-muted-foreground">
                  {post.show_term_start} - {post.show_term_end}
                </p>
              ) : (
                <p className="text-muted-foreground">상설전시 입니다</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2">가격</h3>
              <p className="text-muted-foreground">
                {post.show_price
                  ? post.show_price.toLocaleString() + " 원"
                  : "무료"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">운영 시간</h3>
              {Object.entries(businessHours).map(([day, hours]) => (
                <p key={day} className="text-muted-foreground">
                  {`${day} ${hours}`}
                </p>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleToSite} className="w-full">
              상세 정보 보기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

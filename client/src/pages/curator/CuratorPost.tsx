import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DOMAIN } from "@/constants";
import authStore from "@/store/authStore";

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
  const { userId, role } = authStore();

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
      const response = await fetch(`${DOMAIN}api/curatorPosts/${id}`);
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
                <Button>수정하기</Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.content}</p>
          </CardContent>
          <CardFooter>
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

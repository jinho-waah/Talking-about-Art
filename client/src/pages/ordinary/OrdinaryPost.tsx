import { useEffect, useState, useRef } from "react"; // useRef 추가
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThumbsUp, MessageSquare, Share2, Ellipsis } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "@/constants";
import Comments from "./components/comment";
import authStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";
import Modal from "../common/components/Modal";
import { FormatDate } from "@/lib/utils";
import { useLike } from "@/pages/common/hooks/useLike";
import { UserAvatar } from "../common/layout/ui/UserAvatar";

interface OrdinaryPost {
  id: number;
  author_id: number;
  author_name: string;
  profile_image: string;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
}

export default function OrdinaryPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<OrdinaryPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const { userId, role } = authStore();
  const navigate = useNavigate();
  const commentSectionRef = useRef<HTMLDivElement>(null); // 댓글 섹션 참조를 위한 ref 추가

  const { toggleLike } = useLike();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrdinaryPost();
  }, []);

  useEffect(() => {
    if (commentsUpdated) {
      fetchOrdinaryPost(); // 댓글 변경 시 새로고침
      setCommentsUpdated(false);
    }
  }, [commentsUpdated]);

  const fetchOrdinaryPost = async () => {
    try {
      const response = await fetch(
        `${SERVER_DOMAIN}api/ordinaryPosts/${id}?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        setIsLiked(data.isLiked === 1);
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
        const response = await fetch(
          `${SERVER_DOMAIN}api/ordinaryPosts/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("게시물이 성공적으로 삭제되었습니다.");
          navigate(pageRoutes.ordinaryList);
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

  const handleLikeToggle = async () => {
    if (post && userId) {
      await toggleLike({ userId, postId: post.id });
      fetchOrdinaryPost(); // 좋아요 상태 갱신
    }
  };

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: "smooth" }); // 댓글 섹션으로 스크롤 이동
  };

  if (!post) return <>Loading...</>;

  return (
    <div className="container mx-auto px-1">
      <div className="max-w-3xl mx-auto">
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
                좋아요 {post.like_count}
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
        <Comments
          commentSectionRef={commentSectionRef}
          onCommentsUpdate={() => setCommentsUpdated(true)} // 댓글 업데이트 콜백 전달
        />
        <Modal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { useEffect, useState } from "react";
import authStore from "@/store/authStore";
import { DOMAIN } from "@/constants";

interface PostsListProps {
  title: string;
}

interface CuratorPost {
  id: number;
  title: string;
  content: string;
  curator_name: string;
  like_count: number;
  created_at: string;
}

export default function PostsList({ title }: PostsListProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin, role } = authStore();

  const [curatorPosts, setCuratorPosts] = useState<CuratorPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (title === "큐레이터") {
      fetchCuratorPosts();
    }
  }, [title]);

  const fetchCuratorPosts = async () => {
    try {
      const response = await fetch(`${DOMAIN}api/curatorPosts`);
      if (response.ok) {
        const data = await response.json();
        setCuratorPosts((prevPosts) => [...prevPosts, ...data]);
      } else {
        console.error("Failed to fetch curator posts");
      }
    } catch (error) {
      console.error("Error fetching curator posts:", error);
    }
  };

  const titleFromState = location.state?.title ?? title;

  const typeOfPost = (() => {
    switch (titleFromState) {
      case "전시 예정":
        return "upcomingExhibition";
      case "전시 소개":
        return "currentExhibition";
      case "큐레이터":
        return "curator";
      case "게시글":
        return "ordinary";
      default:
        return "error";
    }
  })();

  const handlePostClick = (id: number) => {
    switch (typeOfPost) {
      case "upcomingExhibition":
        navigate(`${pageRoutes.upCommingPost.replace(":id", String(id))}`);
        break;
      case "currentExhibition":
        navigate(`${pageRoutes.currentPost.replace(":id", String(id))}`);
        break;
      case "curator":
        navigate(`${pageRoutes.curatorPost.replace(":id", String(id))}`);
        break;
      case "ordinary":
        navigate(`${pageRoutes.postPost.replace(":id", String(id))}`);
        break;
      default:
        console.log("error");
        break;
    }
  };

  const handleAddPost = () => {
    switch (typeOfPost) {
      case "upcomingExhibition":
        navigate(`${pageRoutes.addExhibition}`);
        break;
      case "currentExhibition":
        navigate(`${pageRoutes.addExhibition}`);
        break;
      case "curator":
        navigate(`${pageRoutes.addCurator}`);
        break;
      case "ordinary":
        navigate(`${pageRoutes.addPost}`);
        break;
      default:
        console.log("error");
        break;
    }
  };

  const handleLoadMore = () => {
    // setPage((prevPage) => prevPage + 1);
  };

  const tmpData = [
    {
      id: 6,
      title: "New Installation at MoMA",
      author: "Sarah K.",
      avatar: "SK",
      content:
        "Just visited the new installation at MoMA and I'm blown away. The use of light and space is truly innovative...",
      likes: 42,
      comments: 8,
      date: "2 hours ago",
    },
    {
      id: 4,
      title: "Reflections on Abstract Expressionism",
      author: "Michael R.",
      avatar: "MR",
      content:
        "After spending a week immersed in the works of Pollock and de Kooning, I've come to appreciate the raw emotion...",
      likes: 38,
      comments: 5,
      date: "5 hours ago",
    },
    {
      id: 5,
      title: "Virtual Reality in Art: A Game Changer?",
      author: "Elena T.",
      avatar: "ET",
      content:
        "I recently experienced a VR art exhibition and it's got me thinking about the future of art consumption...",
      likes: 56,
      comments: 12,
      date: "1 day ago",
    },
  ];

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{titleFromState}</h1>

          {(typeOfPost === "upcomingExhibition" ||
            typeOfPost === "currentExhibition") &&
            (role === "exhibition" || role === "admin") && (
              <Button onClick={handleAddPost}>전시 추가 </Button>
            )}
          {typeOfPost === "curator" &&
            (role === "curator" || role === "admin") && (
              <Button onClick={handleAddPost}>글 추가 </Button>
            )}
          {typeOfPost === "ordinary" && isLogin === true && (
            <Button onClick={handleAddPost}> 게시글 추가 </Button>
          )}
        </div>

        <div className="mb-6">
          <Input placeholder="Search posts..." />
        </div>

        {title === "큐레이터" &&
          curatorPosts.map((post) => (
            <Card key={post.id} className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{post.curator_name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.curator_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.content}</p>
                </div>
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
            </Card>
          ))}
        {title !== "큐레이터" &&
          tmpData.map((post, index) => (
            <Card key={index} className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{post.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.content}</p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

        <div className="flex justify-center">
          <Button onClick={handleLoadMore}>더 보기</Button>
        </div>
      </div>
    </div>
  );
}

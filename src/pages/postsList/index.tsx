import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../common/components/Layout";
import { pageRoutes } from "@/apiRoutes";

interface PostsListProps {
  title: string;
}

export default function PostsList({ title }: PostsListProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const titleFromState = location.state?.title ?? title;

  const typeOfPost = (() => {
    switch (titleFromState) {
      case "전시 예정":
        return "upcoming";
      case "전시 소개":
        return "introduction";
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
      case "upcoming":
        navigate(`${pageRoutes.upCommingPost.replace(":id", String(id))}`);
        break;
      case "introduction":
        navigate(`${pageRoutes.introducePost.replace(":id", String(id))}`);
        break;
      case "curator":
        navigate(`${pageRoutes.curatorPost.replace(":id", String(id))}`);
        break;
      default:
        navigate(`${pageRoutes.postPost.replace(":id", String(id))}`);
        break;
    }
  };

  const tmpData = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{titleFromState}</h1>

          <div className="mb-6">
            <Input placeholder="Search posts..." />
          </div>

          {tmpData.map((post, index) => (
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
            <Button>Load More Posts</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

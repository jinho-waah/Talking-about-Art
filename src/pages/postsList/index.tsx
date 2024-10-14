import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageSquare, Share2, BookmarkPlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Layout } from "../common/components/Layout";

interface PostsListProps {
  title: string;
}

export default function PostsList({ title }: PostsListProps) {
  const location = useLocation();
  const titleFromState = location.state?.title ?? title;

  const tmpData = [
    {
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
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.content}</p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
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
                  <Button variant="ghost" size="sm">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save
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

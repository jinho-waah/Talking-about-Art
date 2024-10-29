import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp, Share2 } from "lucide-react";
import PostHeader from "./PostHeader";

interface CuratorPostProps {
  post: {
    id: number;
    title: string;
    content: string;
    curator_name: string;
    like_count: number;
    created_at: string;
  };
  onClick: (id: number) => void;
}

export default function CuratorPostCard({ post, onClick }: CuratorPostProps) {
  return (
    <Card className="mb-6 cursor-pointer" onClick={() => onClick(post.id)}>
      <CardHeader>
        <PostHeader
          authorName={post.curator_name}
          createdAt={post.created_at}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-muted-foreground mb-4">{post.content}</p>
        <div className="flex space-x-4">
          <ThumbsUp className="mr-2 h-4 w-4" /> {post.like_count}
          <Share2 className="mr-2 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}

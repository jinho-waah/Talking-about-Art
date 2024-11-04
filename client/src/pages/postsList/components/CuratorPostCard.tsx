import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import PostHeader from "./PostHeader";
import { CuratorPostProps } from "../types";



export default function CuratorPostCard({ post, onClick }: CuratorPostProps) {
  return (
    <Card className="mb-6 cursor-pointer" onClick={() => onClick(post.id)}>
      <CardHeader>
        <PostHeader
          authorName={post.curator_name}
          profileImage={post.profile_image}
          createdAt={post.created_at}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-muted-foreground mb-4">{post.content}</p>
        <div className="flex items-center space-x-2">
          <ThumbsUp
            className={`h-4 w-4 ${
              post.isLiked ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <span>{post.like_count}</span>
        </div>
      </CardContent>
    </Card>
  );
}

import { ThumbsUp, MessageSquare } from "lucide-react";
import { OrdinaryPostProps } from "../types";


export default function OrdinaryPostCard({ post, onClick }: OrdinaryPostProps) {
  return (
    <div
      className="flex justify-between items-center p-4 cursor-pointer border-b border-gray-200"
      onClick={() => onClick(post.id)}
    >
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold text-lg">{post.title}</h3>
        <span className="text-sm text-muted-foreground">
          by {post.author_name}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <ThumbsUp className="mr-1 h-4 w-4" />
          <span className="text-sm">{post.like_count}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="mr-1 h-4 w-4" />
          <span className="text-sm">{post.comment_count}</span>
        </div>
      </div>
    </div>
  );
}

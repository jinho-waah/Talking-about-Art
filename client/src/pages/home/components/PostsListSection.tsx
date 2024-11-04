import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { OrdinaryPost } from "../types";
import ViewMore from "@/pages/home/components/ViewMore";
import { useLateestOrdinaryPost } from "../hooks/useLatestOrdinaryPosts";

export const PostList = () => {
  const navigate = useNavigate();

  const { data: posts = [], isLoading, isError } = useLateestOrdinaryPost();

  const handlePostClick = (id: number) => {
    navigate(`${pageRoutes.ordinaryList}/${id}`);
  };

  if (isLoading || !posts) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>게시물</CardTitle>
        <CardDescription>최근 게시물을 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {posts.map((post: OrdinaryPost) => (
            <li
              key={post.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold">{post.title}</h3>
                  <span className="ml-1 text-sm text-muted-foreground">
                    [{post.comment_count}]
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  by {post.author_name}
                </p>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="mr-2 h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  {post.like_count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <ViewMore path={pageRoutes.ordinaryList} />
    </Card>
  );
};

import { useEffect, useState } from "react";
import { pageRoutes } from "@/apiRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MoreView from "@/pages/home/ui/NavigateToList";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SERVER_DOMAIN } from "@/constants";

interface OrdinaryPost {
  id: number;
  title: string;
  author_name: string;
  like_count: number;
  comment_count: number;
}

export const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<OrdinaryPost[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${SERVER_DOMAIN}api/ordinaryPosts/latest`);
      if (response.ok) {
        const data: OrdinaryPost[] = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostClick = (id: number) => {
    navigate(`${pageRoutes.ordinaryList}/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>게시물</CardTitle>
        <CardDescription>최근 게시물을 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {posts.map((post) => (
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
      <MoreView path={pageRoutes.ordinaryList} />
    </Card>
  );
};

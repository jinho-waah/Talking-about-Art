import { pageRoutes } from "@/apiRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MoreView from "@/pages/common/components/NavigateToList";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PostList = () => {
  const navigate = useNavigate();
  const handlePostClick = (id: number) => {
    navigate(`${pageRoutes.ordinaryList}/${id}`);
  };
  const Posts = [
    {
      id: 1,
      title: "New Installation at MoMA",
      author: "Sarah K.",
      likes: 42,
    },
    {
      id: 2,
      title: "Reflections on Abstract Expressionism",
      author: "Michael R.",
      likes: 38,
    },
    {
      id: 3,
      title: "Virtual Reality in Art: A Game Changer?",
      author: "Elena T.",
      likes: 56,
    },
    {
      id: 4,
      title: "The Rise of NFT Art Collections",
      author: "David L.",
      likes: 29,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>게시물</CardTitle>
        <CardDescription>Recent updates from the community</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {Posts.map((post, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {post.author}
                </p>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="mr-2 h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  {post.likes}
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

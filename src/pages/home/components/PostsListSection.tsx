import { pageRoutes } from "@/apiRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TAB_TITLES } from "@/constants";
import MoreView from "@/pages/common/components/ViewMore";
import { Heart } from "lucide-react";

export const PostList = () => {
  const Posts = [
    {
      title: "New Installation at MoMA",
      author: "Sarah K.",
      likes: 42,
    },
    {
      title: "Reflections on Abstract Expressionism",
      author: "Michael R.",
      likes: 38,
    },
    {
      title: "Virtual Reality in Art: A Game Changer?",
      author: "Elena T.",
      likes: 56,
    },
    {
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
            <li key={index} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {post.author}
                </p>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {post.likes}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <MoreView title={TAB_TITLES.POSTS} path={pageRoutes.postList} />
    </Card>
  );
};

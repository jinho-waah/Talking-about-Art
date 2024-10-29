import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PostHeader from "./PostHeader";

interface ExhibitionPostProps {
  post: {
    id: number;
    show_place: string;
    show_name: string;
    show_term_start: string;
    show_term_end: string;
    image_url: string[];
  };
  onClick: (id: number) => void;
}

export default function ExhibitionPostCard({
  post,
  onClick,
}: ExhibitionPostProps) {
  return (
    <Card className="mb-6 cursor-pointer" onClick={() => onClick(post.id)}>
      <CardHeader>
        <PostHeader
          authorName={post.show_place}
          createdAt={`${post.show_term_start} ~ ${post.show_term_end}`}
        />
      </CardHeader>
      <CardContent>
        <div
          className="w-full aspect-video rounded-lg mb-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image_url[0]})` }}
        />
        <h2 className="text-xl font-semibold mb-2">{post.show_name}</h2>
      </CardContent>
    </Card>
  );
}

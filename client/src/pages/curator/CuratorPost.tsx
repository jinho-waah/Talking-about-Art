import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DOMAIN } from "@/constants";

interface CuratorPostData {
  id: number;
  title: string;
  content: string;
  curator_name: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
}

export default function CuratorPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<CuratorPostData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCuratorPost();
  }, []);

  const fetchCuratorPost = async () => {
    try {
      const response = await fetch(`${DOMAIN}api/curatorPosts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("Failed to fetch curator post");
      }
    } catch (error) {
      console.error("Error fetching curator post:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-1 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5 ml-1">
          Impressionist Masterpieces
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{post.curator_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.curator_name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.created_at}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">
              {post.content}
              {/* The Impressionist Masterpieces exhibition at the Metropolitan
              Museum of Art is a breathtaking journey through the revolutionary
              art movement that changed the course of Western art. From Monet's
              ethereal water lilies to Van Gogh's expressive brushstrokes, this
              collection showcases the best of Impressionism.
            </p>
            <p className="text-muted-foreground mb-4">
              The curation is exceptional, guiding visitors through the
              development of Impressionism and its impact on subsequent art
              movements. The lighting and presentation of each piece allow for
              an intimate experience with these iconic works.
            </p>
            <p className="text-muted-foreground">
              While the crowds can be overwhelming at times, it's a small price
              to pay for the opportunity to see these masterpieces up close. I
              highly recommend this exhibition to anyone with an interest in art
              history or those simply looking to be moved by the beauty of
              Impressionist paintings. */}
            </p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <Button variant="ghost" size="sm" className="w-1/3">
                <ThumbsUp className="mr-2 h-4 w-4" />
                좋아요 {post.like_count}
              </Button>
              <Button variant="ghost" size="sm" className="w-1/3">
                <MessageSquare className="mr-2 h-4 w-4" />
                댓글 {post.comment_count}
              </Button>
              <Button variant="ghost" size="sm" className="w-1/3">
                <Share2 className="mr-2 h-4 w-4" />
                공유
              </Button>
            </div>
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Exhibition Details</h2>
        <Card>
          <CardContent className="grid gap-4 md:grid-cols-2 mt-6">
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">
                Metropolitan Museum of Art
              </p>
              <p className="text-muted-foreground">
                1000 5th Ave, New York, NY 10028
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dates</h3>
              <p className="text-muted-foreground">
                April 15, 2023 - September 30, 2023
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Admission</h3>
              <p className="text-muted-foreground">Adults: $25</p>
              <p className="text-muted-foreground">Seniors: $17</p>
              <p className="text-muted-foreground">Students: $12</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-muted-foreground">Sunday-Thursday: 10am-5pm</p>
              <p className="text-muted-foreground">Friday-Saturday: 10am-9pm</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book Tickets</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

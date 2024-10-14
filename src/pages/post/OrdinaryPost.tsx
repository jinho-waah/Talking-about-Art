import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Share2, Flag } from "lucide-react";
import { Layout } from "../common/components/Layout";

export default function OrdinaryPost() {
  const [replyText, setReplyText] = useState("");
  const tmpData = [
    {
      id: 1,
      author: "Alex Johnson",
      content:
        "I believe AI-generated art will play a huge role in the future of digital art. It's already making waves and challenging our perceptions of creativity.",
    },
    {
      id: 2,
      author: "Sarah Lee",
      content:
        "Virtual and augmented reality will revolutionize how we experience digital art. Imagine walking through a virtual gallery or having art integrated into our daily environments!",
    },
  ];
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">The future of digital art</h1>
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>EC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Emily Chen</p>
                  <p className="text-sm text-muted-foreground">
                    Posted 2 days ago
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                As we dive deeper into the digital age, the art world is
                experiencing a revolutionary transformation. Digital art is no
                longer just a niche; it's becoming a dominant force in the
                creative landscape. What do you think the future holds for
                digital art? How will it change the way we create, consume, and
                value art?
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  45 Likes
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  23 Replies
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Replies</h2>
          {tmpData.map((reply, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {reply.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{reply.author}</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{reply.content}</p>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Add a reply</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type your reply here."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button>Post Reply</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

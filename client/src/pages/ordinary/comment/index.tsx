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
import { ThumbsUp, Share2, Flag } from "lucide-react";

export default function Comments() {
  const [replyText, setReplyText] = useState("");
  const tmpData = [
    {
      id: 1,
      author: "Alex Johnson",
      content:
        "저는 AI가 만든 예술이 디지털 아트의 미래에서 큰 역할을 할 거라고 생각합니다. 이미 많은 파장을 일으키고 있으며 창의성에 대한 우리의 인식을 바꾸고 있습니다.",
    },
    {
      id: 2,
      author: "Sarah Lee",
      content:
        "가상 현실과 증강 현실이 디지털 아트를 경험하는 방식을 완전히 혁신할 것입니다. 가상 갤러리를 걷거나 일상 속에 예술이 통합된 모습을 상상해보세요!",
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">댓글</h2>
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
                <p className="text-sm text-muted-foreground">1일 전</p>
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
                좋아요 32
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="mr-2 h-4 w-4" />
                신고
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                공유
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>댓글 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="댓글을 입력하세요."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button>댓글 등록</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

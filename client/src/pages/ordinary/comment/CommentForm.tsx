import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
export default function CommentsForm() {
  const [replyText, setReplyText] = useState("");
  return (
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
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { getKstTimeString } from "@/lib/utils";

export default function EditOrdinaryPost() {
  const { id } = useParams<{ id: string }>(); // 현재 포스트 ID 가져오기
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const { userId, role } = authStore();

  useEffect(() => {
    // 기존 포스트 내용 불러오기
    const fetchOrdinaryPost = async () => {
      try {
        const response = await fetch(`${DOMAIN}api/ordinaryPosts/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTitle(data.title);
          setContent(data.content);
          if (data.author_id !== userId && role !== "admin") {
            alert("접근 권한이 없습니다.");
            navigate(pageRoutes.main);
          }
        } else {
          console.error("Failed to fetch ordinary post");
        }
      } catch (error) {
        console.error("Error fetching ordinary post:", error);
      }
    };

    fetchOrdinaryPost();
  }, []);

  const handleSubmit = async () => {
    const updatedPost = {
      title: title.trim(),
      content: content.trim(),
      updated_at: getKstTimeString(),
    };

    try {
      const response = await fetch(`${DOMAIN}api/ordinaryPosts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        alert("글이 성공적으로 수정되었습니다!");
        navigate(pageRoutes.ordinaryPost.replace(":id", id!));
      } else {
        alert("글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("글 수정 중 오류가 발생했습니다.");
    }
  };

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  return (
    <div className="container mx-auto px-1 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">큐레이터 글 수정</CardTitle>
          <CardDescription>
            기존의 글을 수정하여 업데이트하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              placeholder="여기에 내용을 작성하세요"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={!isFormValid}
            >
              수정 완료
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

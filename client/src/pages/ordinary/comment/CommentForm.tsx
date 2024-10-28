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
import { SERVER_DOMAIN } from "@/constants";
import { useParams } from "react-router-dom";
import { getKstTimeString } from "@/lib/utils";
import authStore from "@/store/authStore";

export default function CommentsForm() {
  const { id } = useParams();
  const { userId } = authStore();
  const [replyText, setReplyText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 파일 변경 시 미리보기 설정
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setAttachment(file);
      setPreviewUrl(URL.createObjectURL(file)); // 파일 미리보기 URL 생성
    }
  };

  const handleSubmit = async () => {
    if (!replyText.trim() && !attachment) {
      alert("댓글 내용이나 첨부 파일을 입력하세요.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("content", replyText);
    formData.append("userId", userId?.toString() || "");
    formData.append("createdAt", getKstTimeString());

    if (attachment) {
      formData.append("file", attachment);
    }

    try {
      const response = await fetch(`${SERVER_DOMAIN}api/post/comment/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("댓글 등록에 실패했습니다.");
      }

      setReplyText(""); // 입력 초기화
      setAttachment(null);
      setPreviewUrl(null);
      alert("댓글이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("댓글 등록 에러:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>댓글 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="댓글을 입력하세요."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="mt-2"
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="미리보기"
                className="max-w-xs max-h-xs"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "등록 중..." : "댓글 등록"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
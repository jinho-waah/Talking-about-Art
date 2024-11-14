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
import { useParams } from "react-router-dom";
import { getKstTimeString } from "@/utils/time/getKstTimeString"; 
import authStore from "@/store/authStore";
import { usePostComment } from "../hooks/usePostComment";

interface CommentsFormProps {
  onCommentAdded: () => void;
  commentSectionRef: React.RefObject<HTMLDivElement>;
  onCommentsUpdate: () => void;
}

export default function CommentsForm({
  onCommentAdded,
  commentSectionRef,
  onCommentsUpdate,
}: CommentsFormProps) {
  const { id } = useParams();
  const { userId } = authStore();
  const [replyText, setReplyText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setAttachment(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSuccess = () => {
    setReplyText("");
    setAttachment(null);
    setPreviewUrl(null);
    onCommentAdded();
    onCommentsUpdate();
  };

  const handleError = (error: unknown) => {
    console.error("댓글 등록 에러:", error);
    alert("댓글 등록 중 오류가 발생했습니다.");
  };

  const { mutate, isPending } = usePostComment(id!, handleSuccess, handleError);

  const handleSubmit = () => {
    if (!replyText.trim() && !attachment) {
      alert("댓글 내용이나 첨부 파일을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("content", replyText);
    formData.append("userId", userId?.toString() || "");
    formData.append("createdAt", getKstTimeString());

    if (attachment) {
      formData.append("file", attachment);
    }

    mutate(formData);
  };

  return (
    <div ref={commentSectionRef}>
      <Card>
        <CardHeader>
          <CardTitle>댓글 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="댓글을 입력하세요."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            disabled={isPending}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isPending}
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
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "등록 중..." : "댓글 등록"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

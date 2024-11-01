import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";

interface AddOrdinaryFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export const AddOrdinaryForm = ({
  title,
  setTitle,
  content,
  setContent,
}: AddOrdinaryFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">게시물 제목</Label>
        <Input
          id="title"
          placeholder="게시물 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">게시물 내용</Label>
        <Textarea
          id="content"
          placeholder="여기에 게시물 내용을 작성하세요"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
    </>
  );
};

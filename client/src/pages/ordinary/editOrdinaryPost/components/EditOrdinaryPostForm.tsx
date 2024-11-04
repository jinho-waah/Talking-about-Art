import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditOrdinaryPostFormProps {
  title: string;
  setTitle: (e: string) => void;
  content: string;
  setContent: (e: string) => void;
}

export default function EditOrdinaryPostForm({
  title,
  setTitle,
  content,
  setContent,
}: EditOrdinaryPostFormProps) {
  return (
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
    </CardContent>
  );
}

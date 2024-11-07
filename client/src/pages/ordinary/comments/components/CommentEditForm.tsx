import { Button } from "@/components/ui/button";

interface CommentEditFormProps {
  editContent: string;
  setEditContent: (value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  saveEdit: (commentId: number) => void;
  commentId: number;
  handleCancelEdit: () => void;
}

export const CommentEditForm = ({
  editContent,
  setEditContent,
  handleFileChange,
  previewUrl,
  saveEdit,
  commentId,
  handleCancelEdit,
}: CommentEditFormProps) => {
  return (
    <div>
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        rows={4}
        className="w-full mt-2 p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2"
      />
      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="미리보기"
            className="max-w-[200px] h-auto rounded-md"
          />
        </div>
      )}
      <div className="flex space-x-2 mt-2">
        <Button onClick={() => saveEdit(commentId)} size="sm">
          저장
        </Button>
        <Button onClick={handleCancelEdit} variant="outline" size="sm">
          취소
        </Button>
      </div>
    </div>
  );
};

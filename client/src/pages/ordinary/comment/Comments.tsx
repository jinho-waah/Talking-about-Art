import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThumbsUp, Share2, Flag, Ellipsis } from "lucide-react";
import CommentsForm from "./components/CommentForm";
import Modal from "../../../components/common/components/Modal";
import { HOST_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { FormatDate } from "@/lib/utils";
import { useLike } from "@/components/common/hooks/useLike";
import { UserAvatar } from "@/components/common/layout/ui/UserAvatar";
import { useFetchComments } from "./hooks/useFetchComments";
import { useUpdateComment } from "./hooks/useUpdateComment";
import { useDeleteComment } from "./hooks/useDeleteComment";

interface CommentsProps {
  commentSectionRef: React.RefObject<HTMLDivElement>;
  onCommentsUpdate: () => void;
}

export default function Comments({
  commentSectionRef,
  onCommentsUpdate,
}: CommentsProps) {
  const { id } = useParams<string>();
  const { userId, role } = authStore();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  const { toggleLike } = useLike();

  const { data: comments, refetch: refetchComments } = useFetchComments(
    id!,
    userId!
  );
  const updateCommentMutation = useUpdateComment(refetchComments);
  const deleteCommentMutation = useDeleteComment();

  useEffect(() => {
    refetchComments();
  }, [refetchComments]);

  const toggleModal = (commentId: number | null) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(!isModalOpen);
  };

  const initiateEdit = () => {
    if (selectedCommentId !== null) {
      const commentToEdit = comments?.find(
        (comment) => comment.id === selectedCommentId
      );
      if (commentToEdit) {
        setEditCommentId(commentToEdit.id);
        setEditContent(commentToEdit.content);
        setPreviewUrl(
          commentToEdit.file_url
            ? `${HOST_DOMAIN}${commentToEdit.file_url}`
            : null
        );
      }
    }
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setEditFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const saveEdit = async (commentId: number) => {
    if (!editContent.trim() && !editFile) {
      alert("수정할 내용이나 첨부 파일을 입력하세요.");
      return;
    }

    updateCommentMutation.mutate({
      commentId,
      content: editContent,
      userId: userId!,
      file: editFile || undefined,
    });
    setEditCommentId(null);
    setEditFile(null);
    setPreviewUrl(null);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
    setEditFile(null);
    setPreviewUrl(null);
  };

  const handleDelete = async (commentId: number) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate(commentId, {
        onSuccess: () => {
          onCommentsUpdate();
          setIsModalOpen(false);
        },
      });
    }
  };

  const handleLikeToggle = async (commentId: number) => {
    if (userId) {
      await toggleLike({ userId, commentId });
      refetchComments(); // Refetch comments to update like status
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">댓글</h2>
      {comments?.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <UserAvatar
                  userName={comment.nickname}
                  imgUrl={comment.profile_image}
                />
                <div>
                  <p className="font-medium">{comment.nickname}</p>
                  <p className="text-sm text-muted-foreground">
                    {FormatDate(comment.created_at)}
                  </p>
                </div>
              </div>
              {(userId === comment.user_id || role === "admin") && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleModal(comment.id)}
                >
                  <Ellipsis />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="ml-2">
            {editCommentId === comment.id ? (
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
                  <Button onClick={() => saveEdit(comment.id)} size="sm">
                    저장
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    size="sm"
                  >
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {comment.file_url && (
                  <div className="mt-2 mb-4">
                    <img
                      src={`${HOST_DOMAIN}${comment.file_url}`}
                      alt="첨부 이미지"
                      className="max-w-[200px] h-auto rounded-md"
                    />
                  </div>
                )}
                <p>{comment.content}</p>
              </>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLikeToggle(comment.id)}
              >
                <ThumbsUp
                  className={`mr-2 h-4 w-4 ${
                    comment.isLiked ? "text-blue-500" : ""
                  }`}
                />
                좋아요 {comment.like_count}
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
      <CommentsForm
        onCommentAdded={refetchComments}
        commentSectionRef={commentSectionRef}
        onCommentsUpdate={onCommentsUpdate}
      />

      <Modal
        isModalOpen={isModalOpen}
        toggleModal={() => toggleModal(null)}
        handleEdit={initiateEdit}
        handleDelete={() =>
          selectedCommentId !== null && handleDelete(selectedCommentId)
        }
      />
    </div>
  );
}

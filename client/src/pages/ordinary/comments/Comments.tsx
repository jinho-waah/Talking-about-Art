import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsForm from "./components/CommentForm";
import { HOST_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { useFetchComments } from "./hooks/useFetchComments";
import { useUpdateComment } from "./hooks/useUpdateComment";
import { useDeleteComment } from "./hooks/useDeleteComment";
import { CommentsList } from "./components/CommentsList";
import { createPortal } from "react-dom";
import { LoadingPage } from "@/pages/loading/components/LoadingPage";

const Modal = lazy(() => import("../../common/components/Modal"));

interface CommentsProps {
  commentSectionRef: React.RefObject<HTMLDivElement>;
  onCommentsUpdate: () => void;
}

export default function Comments({
  commentSectionRef,
  onCommentsUpdate,
}: CommentsProps) {
  const { id } = useParams();
  const { userId, role } = authStore();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">댓글</h2>
      {comments &&
        comments.map((comment) => (
          <CommentsList
            key={comment.id}
            comment={comment}
            userId={userId}
            role={role}
            editCommentId={editCommentId}
            editContent={editContent}
            setEditContent={setEditContent}
            handleFileChange={handleFileChange}
            previewUrl={previewUrl}
            saveEdit={saveEdit}
            toggleModal={toggleModal}
            handleCancelEdit={handleCancelEdit}
          />
        ))}

      <CommentsForm
        onCommentAdded={refetchComments}
        commentSectionRef={commentSectionRef}
        onCommentsUpdate={onCommentsUpdate}
      />

      {isModalOpen &&
        createPortal(
          <Suspense fallback={<LoadingPage />}>
            <Modal
              isModalOpen={isModalOpen}
              toggleModal={() => toggleModal(null)}
              handleEdit={initiateEdit}
              handleDelete={() =>
                selectedCommentId !== null && handleDelete(selectedCommentId)
              }
            />
          </Suspense>,
          document.body
        )}
    </div>
  );
}

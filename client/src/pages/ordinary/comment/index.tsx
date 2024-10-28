import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, Share2, Flag, Ellipsis } from "lucide-react";
import CommentsForm from "./CommentForm";
import Modal from "../ui/Modal";
import { HOST_DOMAIN, SERVER_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";

interface Comment {
  id: number;
  nickname: string;
  user_id: number;
  content: string;
  like_count: number;
  created_at: string;
  profile_image?: string;
  file_url?: string;
}

export default function Comments() {
  const { id } = useParams<string>();
  const [comments, setComments] = useState<Comment[]>([]);
  const { userId, role } = authStore();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${SERVER_DOMAIN}api/post/comment/${id}`);
        if (!response.ok) {
          throw new Error("댓글을 불러오는 데 실패했습니다.");
        }
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const toggleModal = (commentId: number | null) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(!isModalOpen);
  };

  const initiateEdit = () => {
    if (selectedCommentId !== null) {
      const commentToEdit = comments.find(
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
    setIsModalOpen(false); // 모달 닫기
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setEditFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const saveEdit = async (commentId: number) => {
    const formData = new FormData();
    formData.append("content", editContent);
    formData.append("userId", userId?.toString() || "");

    if (editFile) {
      formData.append("file", editFile);
    }

    try {
      const response = await fetch(
        `${SERVER_DOMAIN}api/post/comment/${commentId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedComment = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, ...updatedComment }
              : comment
          )
        );
        setEditCommentId(null);
        setEditFile(null);
        setPreviewUrl(null);
      } else {
        throw new Error("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
    setEditFile(null);
    setPreviewUrl(null);
  };

  const handleDelete = async (commentId: number) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `${SERVER_DOMAIN}api/post/comment/${commentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
        } else {
          throw new Error("댓글 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">댓글</h2>
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {comment.profile_image ? (
                    <img
                      src={comment.profile_image}
                      alt={`${comment.nickname}'s profile`}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <AvatarFallback>
                      {comment.nickname.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{comment.nickname}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString()}
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
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
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
      <CommentsForm />

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

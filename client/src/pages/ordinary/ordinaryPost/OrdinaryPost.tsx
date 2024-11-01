import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Comments from "../comment/Comments";
import authStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";
import Modal from "../../common/components/Modal";
import OrdinaryPostBody from "./components/OrdinaryPostBody";
import { useFetchOrdinaryPost } from "../hooks/useFetchOrdinaryPost";
import { useDeleteOrdinaryPost } from "./hooks/useDeleteOrdinaryPost";
import { useToggleLike } from "./hooks/useToggleLike";

export default function OrdinaryPost() {
  const { id } = useParams<{ id: string }>();
  const { userId, role } = authStore();
  const navigate = useNavigate();
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const queryClient = useQueryClient();

  const { data: post, isLoading } = useFetchOrdinaryPost(id!, userId);
  const deleteMutation = useDeleteOrdinaryPost();
  const { handleLikeToggle } = useToggleLike(post?.id, userId, id);

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked === 1);
    }
  }, [post]);

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?") && id) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = () => {
    if (id) {
      navigate(pageRoutes.editOrdinaryPost.replace(":id", id));
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) return <>Loading...</>;

  return (
    <div className="container mx-auto px-1">
      <div className="max-w-3xl mx-auto">
        {post && (
          <OrdinaryPostBody
            post={post}
            userId={userId}
            role={role}
            isLiked={isLiked}
            toggleModal={toggleModal}
            handleLikeToggle={handleLikeToggle}
            scrollToComments={scrollToComments}
          />
        )}
        <Comments
          commentSectionRef={commentSectionRef}
          onCommentsUpdate={() =>
            queryClient.invalidateQueries({
              queryKey: ["ordinaryPost", id, userId],
            })
          }
        />
        <Modal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

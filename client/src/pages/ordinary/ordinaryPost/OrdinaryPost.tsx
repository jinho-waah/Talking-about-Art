import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Comments from "../comments/Comments";
import authStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";
import OrdinaryPostBody from "./components/OrdinaryPostBody";
import { useFetchOrdinaryPost } from "../hooks/useFetchOrdinaryPost";
import { useDeleteOrdinaryPost } from "./hooks/useDeleteOrdinaryPost";
import { useToggleLike } from "@/pages/common/hooks/useToggleLike";
import { LoadingPage } from "@/pages/loading/components/LoadingPage";
import { createPortal } from "react-dom";

const Modal = lazy(() => import("../../common/components/Modal"));

export default function OrdinaryPost() {
  const { id } = useParams();
  const { userId, role } = authStore();
  const navigate = useNavigate();
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: post, isLoading } = useFetchOrdinaryPost(id, userId);
  const deleteMutation = useDeleteOrdinaryPost();

  const { isLiked, setIsLiked, likeCount, setLikeCount, handleLikeToggle } =
    useToggleLike({
      targetType: "ordinaryPost",
      targetId: post?.id,
      userId: userId,
    });

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked === 1);
      setLikeCount(post.like_count);
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

  if (isLoading || post === undefined) return <>Loading...</>;

  return (
    <div className="container ml-auto max-w-4xl px-1">
      <OrdinaryPostBody
        post={post}
        userId={userId}
        role={role}
        isLiked={isLiked}
        likeCount={likeCount}
        toggleModal={toggleModal}
        handleLikeToggle={handleLikeToggle}
        scrollToComments={scrollToComments}
      />
      <Comments
        commentSectionRef={commentSectionRef}
        onCommentsUpdate={() =>
          queryClient.invalidateQueries({
            queryKey: ["ordinaryPost", id, userId],
          })
        }
      />
      {isModalOpen &&
        createPortal(
          <Suspense fallback={<LoadingPage />}>
            <Modal
              isModalOpen={isModalOpen}
              toggleModal={toggleModal}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Suspense>,
          document.body
        )}
    </div>
  );
}

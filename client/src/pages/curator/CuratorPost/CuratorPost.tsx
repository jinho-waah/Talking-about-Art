import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authStore from "@/store/authStore";
import { pageRoutes } from "@/apiRoutes";
import CuratorPostBottom from "./components/CuratorPostBottom";
import CuratorPostTop from "./components/CuratorPostTop";
import { useGetCuratorPost } from "../hooks/useGetCuratorPost";
import { useToggleLike } from "./hooks/useToggleLike";
import { useDeleteCuratorPost } from "./hooks/useDeleteCuratorPost";

export default function CuratorPost() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId, role } = authStore();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);

  const { data: post, isError, isLoading } = useGetCuratorPost(id, userId);
  const { handleLikeToggle } = useToggleLike(post?.id, userId, id);

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked === 1);
    }
  }, [post]);

  const deleteMutation = useDeleteCuratorPost();

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = () => {
    if (id) {
      navigate(pageRoutes.editCuratorPost.replace(":id", id));
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !post) {
    return <div>Error fetching curator post.</div>;
  }

  const handleToSite = () => {
    window.open(post.show_link, "_blank");
  };

  const businessHours = JSON.parse(post.business_hours);

  return (
    <div className="container mx-auto px-1">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5 ml-1">큐레이터의 전시 이야기</h1>
        <CuratorPostTop
          post={post}
          userId={userId}
          role={role}
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleLikeToggle={handleLikeToggle}
          isLiked={isLiked}
        />

        <h2 className="text-2xl font-semibold mb-4 ml-1">전시 정보</h2>
        <CuratorPostBottom
          post={post}
          businessHours={businessHours}
          handleToSite={handleToSite}
        />
      </div>
    </div>
  );
}

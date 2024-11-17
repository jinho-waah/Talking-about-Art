import { useState, useEffect } from "react";
import { ROLE } from "@/constants";
import authStore from "@/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import EditCuratorPostForm from "./components/EditCuratorPostForm";
import { useGetCuratorPost } from "../hooks/useGetCuratorPost";
import { useSearchShowForCuratorPost } from "../hooks/useSearchShowForCuratorPost";
import { useUpdateCuratorPost } from "./hooks/useUpdateCuratorPost";

export default function EditCuratorPost() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showId, setShowId] = useState<number | undefined>(undefined);
  const [showName, setShowName] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const { userId, role } = authStore();

  const { data: post, isError } = useGetCuratorPost(id, userId);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setShowId(post.show_id);
      setShowName(post.show_name);

      if (post.curator_id !== userId && role !== ROLE.ADMIN) {
        alert("접근 권한이 없습니다.");
        navigate(pageRoutes.main);
      }
    }
  }, [post, userId, role, navigate]);

  const updateMutation = useUpdateCuratorPost(id);

  const handleSubmit = () => {
    if (!showId) return;

    const updatedPost = {
      show_id: showId,
      title: title.trim(),
      content: content.trim(),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    updateMutation.mutate(updatedPost);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: searchResults, refetch: refetchSearch } =
    useSearchShowForCuratorPost(searchQuery);

  const handleSearch = () => {
    refetchSearch();
  };

  const handleSelectShow = (id: number, name: string) => {
    setShowId(id);
    setShowName(name);
    handleCloseModal();
  };

  const isFormValid =
    title.trim() !== "" && content.trim() !== "" && showId !== undefined;

  if (isError) return <>ERROR</>;

  return (
    <div className="container mx-auto px-1 py-8">
      <EditCuratorPostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleOpenModal={handleOpenModal}
        showName={showName}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        searchResults={searchResults?.data || []} // 검색 결과 데이터 설정
        handleSelectShow={handleSelectShow}
      />
    </div>
  );
}

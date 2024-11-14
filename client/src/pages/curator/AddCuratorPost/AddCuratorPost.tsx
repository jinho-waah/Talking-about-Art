import { useState, useEffect } from "react";
import authStore from "@/store/authStore";
import { getKstTimeString } from "@/utils/time/getKstTimeString"; 
import { useSearchShowForCuratorPost } from "../hooks/useSearchShowForCuratorPost";
import AddCuratorPostForm from "./components/AddCuratorPostForm";
import { useAddCuratorPost } from "./hooks/useAddCuratorPost";

export default function AddCuratorPost() {
  const [title, setTitle] = useState<string>(
    localStorage.getItem("title") || ""
  );
  const [content, setContent] = useState<string>(
    localStorage.getItem("content") || ""
  );
  const [showId, setShowId] = useState<number | undefined>(undefined);
  const [showName, setShowName] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { userId } = authStore();

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("content", content);
  }, [content]);

  const { mutate: submitPost } = useAddCuratorPost(
    setTitle,
    setContent,
    setShowId
  );

  const handleSubmit = () => {
    if (!showId) return;

    const newPost = {
      curator_id: userId,
      show_id: showId,
      title: title.trim(),
      content: content.trim(),
      created_at: getKstTimeString(),
      updated_at: getKstTimeString(),
      like_count: 0,
    };

    submitPost(newPost);
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

  return (
    <div className="container ml-auto max-w-4xl px-1">
      <AddCuratorPostForm
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
        searchResults={searchResults?.data || []}
        handleSelectShow={handleSelectShow}
      />
    </div>
  );
}

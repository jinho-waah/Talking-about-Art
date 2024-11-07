import { useState, useEffect } from "react";
import authStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { EditMyPageForm } from "./components/EditMyPageForm";
import { ProfileData } from "../types";
import { useFetchMyPage } from "./hooks/useFetchMyPage";
import { useUpdateMyPage } from "./hooks/useUpdateMyPage";

export default function EditMyPage() {
  const { userId } = authStore();
  const { setImgUrl } = authStore().actions;
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: profileData, isLoading, error } = useFetchMyPage(userId);

  const [localProfileData, setLocalProfileData] = useState<ProfileData>(
    profileData || {
      avatarSrc: "",
      nickname: "",
      bio: "",
      website: "",
      x: "",
      instagram: "",
      thread: "",
    }
  );

  useEffect(() => {
    if (profileData) {
      setLocalProfileData(profileData);
    }
  }, [profileData]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalProfileData((prev) => ({
          ...prev,
          avatarSrc: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setLocalProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { mutate: updateProfile, isPending } = useUpdateMyPage(
    userId,
    localProfileData,
    selectedFile,
    setImgUrl,
    navigate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(localProfileData);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div className="container mx-auto px-4">
      <EditMyPageForm
        profileData={localProfileData}
        handleSubmit={handleSubmit}
        handleAvatarUpload={handleAvatarUpload}
        handleChange={handleChange}
        isPending={isPending}
      />
    </div>
  );
}

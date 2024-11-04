// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import authStore from "@/store/authStore";
// import { useNavigate } from "react-router-dom";
// import { pageRoutes } from "@/apiRoutes";
// import { EditMyPageForm } from "./components/EditMyPageForm";
// import { ProfileData } from "../types";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { getMyPageByUserId } from "../api";
// import { postUploadAvatarImage, putMyPage } from "./api";

// export default function EditMyPage() {
//   const { userId } = authStore();
//   const { setImgUrl } = authStore().actions;
//   const navigate = useNavigate();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const {
//     data: profileData,
//     isLoading,
//     error,
//   } = useQuery<ProfileData, Error>({
//     queryKey: ["myPage", userId],
//     queryFn: async () => {
//       const response = await getMyPageByUserId(userId);
//       return {
//         avatarSrc: response.data.profile_image || "",
//         nickname: response.data.nickname || "",
//         bio: response.data.bio || "",
//         website: response.data.website || "",
//         x: response.data.x || "",
//         instagram: response.data.instagram || "",
//         thread: response.data.thread || "",
//       };
//     },
//   });

//   const [localProfileData, setLocalProfileData] = useState<ProfileData>(
//     profileData || {
//       avatarSrc: "",
//       nickname: "",
//       bio: "",
//       website: "",
//       x: "",
//       instagram: "",
//       thread: "",
//     }
//   );

//   useEffect(() => {
//     if (profileData) {
//       setLocalProfileData(profileData);
//     }
//   }, [profileData]);

//   const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setLocalProfileData((prev) => ({
//           ...prev,
//           avatarSrc: e.target?.result as string,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { id, value } = e.target;
//     setLocalProfileData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const uploadAvatar = async (): Promise<string | null> => {
//     if (!selectedFile) return null;
//     const formData = new FormData();
//     formData.append("avatar", selectedFile);

//     try {
//       const response = await postUploadAvatarImage(userId, formData);
//       return response.data.filePath;
//     } catch (error) {
//       console.error("Image upload error:", error);
//       return null;
//     }
//   };

//   const putMyPageMutation = useMutation({
//     mutationFn: async (updatedProfileData: ProfileData) => {
//       let avatarPath = localProfileData.avatarSrc;
//       if (selectedFile) {
//         const uploadedAvatarPath = await uploadAvatar();
//         if (uploadedAvatarPath) {
//           avatarPath = uploadedAvatarPath;
//           setImgUrl(uploadedAvatarPath);
//         } else {
//           throw new Error("프로필 이미지 업로드 중 오류 발생");
//         }
//       }

//       await putMyPage(userId, updatedProfileData, avatarPath);
//     },
//     onSuccess: () => {
//       navigate(`${pageRoutes.myPage}/${userId}`);
//     },
//     onError: (error) => {
//       console.error("프로필 업데이트 중 오류 발생:", error);
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     putMyPageMutation.mutate(localProfileData);
//   };

//   if (isLoading) return <p>로딩 중...</p>;
//   if (error) return <p>오류 발생: {error.message}</p>;

//   return (
//     <div className="container mx-auto px-4">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">마이 페이지 수정</CardTitle>
//           <CardDescription>프로필을 설정하여 당신을 알려주세요</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <EditMyPageForm
//             profileData={localProfileData}
//             handleAvatarUpload={handleAvatarUpload}
//             handleChange={handleChange}
//           />
//           <CardFooter>
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={putMyPageMutation.isPending}
//             >
//               수정 완료
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">마이 페이지 수정</CardTitle>
          <CardDescription>프로필을 설정하여 당신을 알려주세요</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <EditMyPageForm
            profileData={localProfileData}
            handleAvatarUpload={handleAvatarUpload}
            handleChange={handleChange}
          />
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              수정 완료
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { SERVER_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

type ProfileData = {
  avatarSrc: string;
  name: string;
  bio: string;
  website: string;
  x: string;
  instagram: string;
  thread: string;
};

export default function EditMyPage() {
  const { userId } = authStore();
  const { setImgUrl } = authStore().actions;
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    avatarSrc: "",
    name: "",
    bio: "",
    website: "",
    x: "",
    instagram: "",
    thread: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${SERVER_DOMAIN}api/mypage/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            avatarSrc: data.profile_image || "",
            name: data.nickname || "",
            bio: data.bio || "",
            website: data.website || "",
            x: data.x || "",
            instagram: data.instagram || "",
            thread: data.thread || "",
          });
        } else {
          console.error("프로필 데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // 선택한 파일 저장
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
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
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await fetch(
        `${SERVER_DOMAIN}api/upload/avatar/${userId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.filePath;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let avatarPath = profileData.avatarSrc;

    if (selectedFile) {
      const uploadedAvatarPath = await uploadAvatar();
      if (uploadedAvatarPath) {
        avatarPath = uploadedAvatarPath;
        setImgUrl(uploadedAvatarPath);
      } else {
        console.error("프로필 이미지 업로드 중 오류 발생");
        return; // 이미지 업로드 실패 시 업데이트 진행하지 않음
      }
    }

    try {
      const response = await fetch(`${SERVER_DOMAIN}api/mypage/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nickname: profileData.name,
          bio: profileData.bio,
          website: profileData.website,
          x: profileData.x,
          instagram: profileData.instagram,
          thread: profileData.thread,
          profile_image: avatarPath,
        }),
      });

      if (!response.ok) {
        console.error("프로필 업데이트 실패");
      } else {
        navigate(`${pageRoutes.myPage}/${userId}`);
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">마이 페이지 수정</CardTitle>
          <CardDescription>프로필을 설정하여 당신을 알려주세요</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.avatarSrc} alt="프로필 이미지" />
                <AvatarFallback>
                  {profileData.name ? profileData.name[0] : "CN"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
                    <Upload className="w-4 h-4" />
                    <span>프로필 이미지 업로드</span>
                  </div>
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="조진호"
                value={profileData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">자기소개</Label>
              <Textarea
                id="bio"
                placeholder="간단한 자기소개 해주세요"
                value={profileData.bio || ""}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">웹사이트 (선택사항)</Label>
              <Input
                id="website"
                placeholder="https://www.yourwebsite.com"
                value={profileData.website || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x">X (선택사항)</Label>
              <Input
                id="x"
                placeholder="@your_x_id"
                value={profileData.x || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (선택사항)</Label>
              <Input
                id="instagram"
                placeholder="@your_instagram_id"
                value={profileData.instagram || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thread">Thread (선택사항)</Label>
              <Input
                id="thread"
                placeholder="@your_thread_id"
                value={profileData.thread || ""}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              수정 완료
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

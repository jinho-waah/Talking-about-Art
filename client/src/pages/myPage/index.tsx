import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { MyPageForm } from "./components/MyPageForm";
import { pageRoutes } from "@/apiRoutes";
import { ProfileData } from "./types";

export default function MyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pageId = id ? parseInt(id, 10) : null;

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { userId } = authStore();

  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate(pageRoutes.main);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}api/mypage/${pageId}`
        );
        setProfileData({
          avatarSrc: response.data.profile_image,
          nickname: response.data.nickname,
          bio: response.data.bio,
          website: response.data.website,
          x: response.data.x,
          instagram: response.data.instagram,
          thread: response.data.thread,
        });
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (pageId) {
      fetchProfileData();
    }
  }, [pageId, userId]);

  const handleEditClick = () => {
    navigate(pageRoutes.editMyPage);
  };

  return (
    <div className="container mx-auto px-1">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">프로필</CardTitle>
          <CardDescription>프로필을 확인하세요</CardDescription>
        </CardHeader>
        <MyPageForm profileData={profileData} />
        {userId === pageId && (
          <CardFooter>
            <Button className="w-full" onClick={handleEditClick}>
              프로필 편집
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

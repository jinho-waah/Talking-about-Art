import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../common/components/Layout";
import { useEffect, useState } from "react";
import { DOMAIN } from "@/constants";
import { Instagram, Twitter, AtSign } from "lucide-react";
import authStore from "@/store/authStore";

type ProfileData = {
  avatarSrc: string;
  nickname: string;
  introduction: string;
  website: string;
  x: string;
  instagram: string;
  thread: string;
};

export default function ViewProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pageId = id ? parseInt(id, 10) : null;

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { userId } = authStore();

  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${DOMAIN}api/mypage/${pageId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            avatarSrc: data.profile_image,
            nickname: data.nickname,
            introduction: data.introduction,
            website: data.website,
            x: data.x,
            instagram: data.instagram,
            thread: data.thread,
          });
        } else {
          console.error("프로필 데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (pageId) {
      fetchProfileData();
    }
  }, [pageId, userId, navigate]);

  const handleEditClick = () => {
    navigate("/editmypage");
  };

  return (
    <Layout>
      <div className="container mx-auto px-1 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">프로필</CardTitle>
            <CardDescription>프로필을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {profileData ? (
              <>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={profileData.avatarSrc}
                      alt="프로필 이미지"
                    />
                    <AvatarFallback>{profileData.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {profileData.nickname}
                    </h2>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">자기소개</h3>
                  <p className="bg-muted rounded-lg p-4">
                    {profileData.introduction}
                  </p>
                </div>
                {profileData.website && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">웹사이트</h3>
                    <a
                      href={
                        /^https?:\/\//.test(profileData.website)
                          ? profileData.website
                          : `http://${profileData.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-700"
                    >
                      {profileData.website}
                    </a>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="font-semibold">소셜 미디어</h3>
                  <ul>
                    {profileData.x && (
                      <li className="flex items-center space-x-2">
                        <Twitter className="w-5 h-5" />
                        <a
                          href={`https://x.com/${profileData.x}`}
                          target="_blank"
                          className="underline hover:no-underline"
                        >
                          @{profileData.x}
                        </a>
                      </li>
                    )}
                    {profileData.instagram && (
                      <li className="flex items-center space-x-2">
                        <Instagram className="w-5 h-5" />
                        <a
                          href={`https://www.instagram.com/${profileData.instagram}`}
                          target="_blank"
                          className="underline hover:no-underline"
                        >
                          {profileData.instagram}
                        </a>
                      </li>
                    )}
                    {profileData.thread && (
                      <li className="flex items-center space-x-2">
                        <AtSign className="w-5 h-5" />
                        <a
                          href={`https://www.threads.net/@${profileData.thread}`}
                          target="_blank"
                          className="underline hover:no-underline"
                        >
                          {profileData.thread}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <p>프로필 정보를 불러오는 중입니다...</p>
            )}
          </CardContent>
          {userId === pageId && (
            <CardFooter>
              <Button className="w-full" onClick={handleEditClick}>
                프로필 편집
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </Layout>
  );
}

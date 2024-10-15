import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Layout } from "../common/components/Layout";

export default function ViewProfile() {
  const navigate = useNavigate();

  const profileData = {
    avatarSrc: "",
    name: "홍길동",
    bio: "저는 큐레이터로서 현대 미술에 대한 깊은 애정을 가지고 있습니다. 다양한 전시회를 기획하고 있으며, 최신 트렌드를 반영한 전시회를 큐레이팅합니다.",
    website: "https://www.yourcuratorwebsite.com",
    socialMedia: "@your_curator_handle",
  };

  const handleEditClick = () => {
    navigate("/editmypage");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">프로필 보기</CardTitle>
            <CardDescription>프로필을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.avatarSrc} alt="프로필 이미지" />
                <AvatarFallback>홍</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">자기소개</h3>
              <p>{profileData.bio}</p>
            </div>
            <div className="space-y-2">
              {profileData.website && (
                <div>
                  <h3 className="font-semibold">웹사이트</h3>
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profileData.website}
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {profileData.socialMedia && (
                <div>
                  <h3 className="font-semibold">소셜 미디어</h3>
                  <p>{profileData.socialMedia}</p>
                </div>
              )}
            </div>
          </CardContent>
          <div className="flex justify-end px-6 py-4">
            <Button onClick={handleEditClick}>프로필 편집</Button>{" "}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

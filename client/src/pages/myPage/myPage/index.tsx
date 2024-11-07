import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import authStore from "@/store/authStore";
import { MyPageForm } from "./components/MyPageForm";
import { pageRoutes } from "@/apiRoutes";
import { useMyPageData } from "./hooks/useMyPageData";

export default function MyPage() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const pageId = id ? parseInt(id, 10) : null;
  const { userId } = authStore();
  const { data: profileData, isLoading, isError } = useMyPageData(pageId);

  if (isLoading) return <p>프로필 정보를 불러오는 중입니다...</p>;
  if (isError) return <p>프로필 데이터를 불러오는 중 오류가 발생했습니다.</p>;

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

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ListName {
  title: string; // 가능한 title 값 정의
  path: string; // 해당하는 경로를 정의
}

const ViewMore = ({ title, path }: ListName) => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate(path); // 경로로 직접 이동
  };
  console.log(title);
  console.log(path);

  return (
    <CardFooter>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleViewMoreClick}
      >
        더 보기
      </Button>
    </CardFooter>
  );
};

export default ViewMore;

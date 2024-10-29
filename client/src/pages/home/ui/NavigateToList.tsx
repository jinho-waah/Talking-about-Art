import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ListName {
  path: string; // 해당하는 경로를 정의
}

const NavigateToPageList = ({ path }: ListName) => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate(path); // 경로로 직접 이동
  };

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

export default NavigateToPageList;

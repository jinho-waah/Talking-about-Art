import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ListName {
  path: string;
}

const ViewMore = ({ path }: ListName) => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate(path);
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

export default ViewMore;

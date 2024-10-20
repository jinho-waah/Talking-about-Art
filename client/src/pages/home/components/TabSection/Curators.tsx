import { useEffect, useState } from "react";
import { pageRoutes } from "@/apiRoutes";
import { DOMAIN } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ViewMore from "@/pages/common/components/NavigateToList";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Review {
  id: number;
  show_id: number;
  title: string;
  content: string;
  curator_name: string;
}

const Curators = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const navigate = useNavigate();

  const fetchRecentCuratorPosts = async () => {
    try {
      const response = await fetch(`${DOMAIN}api/curatorPosts/recent`);
      if (response.ok) {
        const data = await response.json();
        setReviewsData(data);
      } else {
        console.error("Failed to fetch recent curator posts");
      }
    } catch (error) {
      console.error("Error fetching recent curator posts:", error);
    }
  };

  useEffect(() => {
    fetchRecentCuratorPosts();
  }, []);

  const handleReadClick = (id: number) => {
    // console.log(id);
    navigate(`${pageRoutes.curatorList}/${id}`);
  };

  return (
    <TabsContent value="reviews">
      <Card>
        <CardHeader>
          <CardTitle>큐레이터</CardTitle>
          <CardDescription>
            최근 전시회에 대한 전문가의 심층 리뷰와 의견을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {reviewsData.map((event) => (
              <li key={event.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                      by {event.curator_name}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReadClick(event.id)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <ViewMore path={pageRoutes.curatorList} />
      </Card>
    </TabsContent>
  );
};

export default Curators;

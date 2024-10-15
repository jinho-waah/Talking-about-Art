// Reviews.tsx

import { pageRoutes } from "@/apiRoutes";
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
import { Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Curators = () => {
  const navigate = useNavigate();
  const handleReadClick = (id: number) => {
    navigate(`${pageRoutes.curatorList}/${id}`);
  };
  const reviewsData = [
    {
      id: 1,
      title: "Impressionist Masterpieces",
      reviewer: "John D.",
    },
    {
      id: 2,
      title: "Contemporary Sculpture Garden",
      reviewer: "John D.",
    },

    {
      id: 3,
      title: "Photography Through Time",
      reviewer: "John D.",
    },
  ];
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
            {reviewsData.map((event, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      by {event.reviewer}
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

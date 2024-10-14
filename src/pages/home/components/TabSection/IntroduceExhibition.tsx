// IntroduceExhibition.tsx

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
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 토론 주제 데이터 분리

const IntroduceExhibition = () => {
  const navigate = useNavigate();
  const handleJoinClick = (id: number) => {
    navigate(`${pageRoutes.introduceList}/${id}`);
  };

  const discussionTopics = [
    {
      id: 1,
      title: "Modern Art Showcase",
      location: "New York City",
      date: "June 15, 2023",
    },
    {
      id: 2,
      title: "Abstract Expressions",
      location: "Los Angeles",
      date: "July 22, 2023",
    },
    {
      id: 3,
      title: "Digital Art Revolution",
      location: "San Francisco",
      date: "August 10, 2023",
    },
  ];
  return (
    <TabsContent value="discussions">
      <Card>
        <CardHeader>
          <CardTitle>전시 소개</CardTitle>
          <CardDescription>
            전시회를 미리 살펴보고 자세한 내용을 알아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {discussionTopics.map((event, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.location} • {event.date}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleJoinClick(event.id)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Join
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <ViewMore path={pageRoutes.introduceList} />
      </Card>
    </TabsContent>
  );
};

export default IntroduceExhibition;

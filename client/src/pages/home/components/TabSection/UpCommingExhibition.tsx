// /home/components/tabsection/upcommingExhibition.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import ViewMore from "@/pages/home/components/ViewMore";
import { pageRoutes } from "@/apiRoutes";
import { useNavigate } from "react-router-dom";

const UpCommingExhibition = () => {
  const navigate = useNavigate();
  const handleJoinClick = (id: number) => {
    navigate(`${pageRoutes.upCommingList}/${id}`);
  };

  const upCommingExhibitions = [
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
    <TabsContent value="upcoming">
      <Card>
        <CardHeader>
          <CardTitle>전시 예정</CardTitle>
          <CardDescription>다가오는 전시회를 미리 만나보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {upCommingExhibitions.map((event, index) => (
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
        <ViewMore path={pageRoutes.upCommingList} />
      </Card>
    </TabsContent>
  );
};

export default UpCommingExhibition;

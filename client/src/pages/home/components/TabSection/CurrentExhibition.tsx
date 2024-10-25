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
import { DOMAIN } from "@/constants";
import ViewMore from "@/pages/common/components/NavigateToList";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ExhibitionPost {
  id: number;
  show_place: string;
  show_name: string;
  show_term_start: string;
  show_term_end: string;
}

const CurrentExhibition = () => {
  const [exhibitionData, setExhibitionData] = useState<ExhibitionPost[]>([]);
  const navigate = useNavigate();
  const handleJoinClick = (id: number) => {
    navigate(`${pageRoutes.currentList}/${id}`);
  };

  const fetchRecentCuratorPosts = async () => {
    try {
      const response = await fetch(`${DOMAIN}api/exhibitionPosts/latest`);
      if (response.ok) {
        const data = await response.json();
        setExhibitionData(data);
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

  return (
    <TabsContent value="current">
      <Card>
        <CardHeader>
          <CardTitle>전시 소개</CardTitle>
          <CardDescription>
            전시회를 미리 살펴보고 자세한 내용을 알아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {exhibitionData.map((event, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{event.show_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.show_place} • {event.show_term_start} ~{" "}
                    {event.show_term_end}
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
        <ViewMore path={pageRoutes.currentList} />
      </Card>
    </TabsContent>
  );
};

export default CurrentExhibition;

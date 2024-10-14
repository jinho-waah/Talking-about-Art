// /home/components/tabsection/upcommingExhibition.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import ViewMore from "@/pages/common/components/ViewMore";
import { TAB_TITLES } from "@/constants";
import { pageRoutes } from "@/apiRoutes"; // 경로 사용

export const UpCommingExhibition = () => {
  const upCommingExhibitions = [
    {
      title: "Modern Art Showcase",
      location: "New York City",
      date: "June 15, 2023",
    },
    {
      title: "Abstract Expressions",
      location: "Los Angeles",
      date: "July 22, 2023",
    },
    {
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
          <CardDescription>다가올 전시를 구경하세요!</CardDescription>
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
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <ViewMore
          title={TAB_TITLES.UPCOMING_EXHIBITION}
          path={pageRoutes.upCommingList}
        />
      </Card>
    </TabsContent>
  );
};

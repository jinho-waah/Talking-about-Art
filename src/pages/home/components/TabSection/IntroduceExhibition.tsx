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
import { TAB_TITLES } from "@/constants";
import ViewMore from "@/pages/common/components/ViewMore";
import { MessageSquare } from "lucide-react";

// 토론 주제 데이터 분리
const discussionTopics = [
  "The future of digital art",
  "Sustainability in exhibitions",
  "Emerging artists to watch",
];

const IntroduceExhibition = () => {
  return (
    <TabsContent value="discussions">
      <Card>
        <CardHeader>
          <CardTitle>전시 소개</CardTitle>
          <CardDescription>
            Join the conversation about art and exhibitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {discussionTopics.map((topic, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{topic}</h3>
                  <p className="text-sm text-muted-foreground">
                    23 replies • 2 hours ago
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Reply
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <ViewMore
          title={TAB_TITLES.INTRODUCTION}
          path={pageRoutes.introduceList}
        />
      </Card>
    </TabsContent>
  );
};

export default IntroduceExhibition;

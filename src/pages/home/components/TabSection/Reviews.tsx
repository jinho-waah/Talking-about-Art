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
import { TAB_TITLES } from "@/constants";
import ViewMore from "@/pages/common/components/ViewMore";
import { Star, BookOpen } from "lucide-react";

// 리뷰 데이터 분리
const reviewsData = [
  {
    title: "Impressionist Masterpieces",
    reviewer: "John D.",
  },
  {
    title: "Contemporary Sculpture Garden",
    reviewer: "John D.",
  },
  {
    title: "Photography Through Time",
    reviewer: "John D.",
  },
];

const Reviews = () => {
  return (
    <TabsContent value="reviews">
      <Card>
        <CardHeader>
          <CardTitle>리뷰</CardTitle>
          <CardDescription>
            See what the community thinks about recent exhibitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {reviewsData.map((review, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{review.title}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      by {review.reviewer}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <ViewMore title={TAB_TITLES.REVIEW} path={pageRoutes.reviewList} />
      </Card>
    </TabsContent>
  );
};

export default Reviews;

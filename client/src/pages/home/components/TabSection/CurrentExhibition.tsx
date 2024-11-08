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
import ViewMore from "@/pages/home/components/ViewMore";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExhibitionPost } from "../../types";
import { useLatestExhibitionPosts } from "../../hooks/useLatestExhibitionPosts";
import { TabSectionSkeleton } from "../skeletons/TabsectionSkeleton";

const CurrentExhibition = () => {
  const navigate = useNavigate();
  const handleJoinClick = (id: number) => {
    navigate(`${pageRoutes.currentList}/${id}`);
  };
  const {
    data: exhibitionData = [],
    isLoading,
    isError,
  } = useLatestExhibitionPosts();

  if (isLoading || !exhibitionData) {
    return <TabSectionSkeleton />;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }
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
            {exhibitionData.map((event: ExhibitionPost) => (
              <li key={event.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold line-clamp-2 overflow-hidden text-ellipsis max-h-12">
                    {event.show_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {event.show_place} • {event.show_term_start}&nbsp;~&nbsp;
                    {event.show_term_end}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
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

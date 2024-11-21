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
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CuratorPost } from "../../types";
import { useLatestCuratorPosts } from "../../hooks/useLatestCuratorPosts";
import { TabSectionSkeleton } from "../skeletons/TabSectionSkeleton"; 

const Curators = () => {
  const navigate = useNavigate();

  const {
    data: curatorsData = [],
    isLoading,
    isError,
  } = useLatestCuratorPosts();

  const handleReadClick = (id: number) => {
    navigate(`${pageRoutes.curatorList}/${id}`);
  };

  if (isLoading || !curatorsData) {
    return <TabSectionSkeleton />;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }

  return (
    <TabsContent value="reviews">
      <Card>
        <CardHeader>
          <CardTitle>큐레이터</CardTitle>
          <CardDescription>
            최근 전시에 대한 전문가의 심층 리뷰를 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {curatorsData.map((event: CuratorPost) => (
              <li key={event.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold line-clamp-2 overflow-hidden text-ellipsis max-h-12">
                    {event.title}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                      by {event.curator_name}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
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

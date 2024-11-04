import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Carousel from "../../ui/Carousel";
import { Exhibition } from "../../types";

interface ExhibitionMainBlockProps {
  exhibitionPosts: Exhibition;
  startDate: Date;
  endDate: Date;
  dailyTime: Record<string, string>;
}

export default function ExhibitionMainBlock({
  exhibitionPosts,
  startDate,
  endDate,
  dailyTime,
}: ExhibitionMainBlockProps) {
  return (
    <div className="lg:col-span-2">
      <Carousel items={exhibitionPosts.image_url} />
      <div className="flex flex-wrap gap-3 mb-6">
        {exhibitionPosts.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center">
            #{tag}
          </Badge>
        ))}
      </div>

      <Card className="lg:hidden">
        <CardHeader>
          <p className="text-2xl font-bold mb-2">
            {exhibitionPosts.show_price !== 0
              ? `${exhibitionPosts.show_price}원`
              : "무료 전시입니다"}
          </p>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-2">사이트가기</Button>
          <Button className="w-full mb-2">인스타그램</Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            공유하기
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>참여 작가</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="font-medium">{exhibitionPosts.show_artist}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>전시 일정</CardTitle>
          <CardDescription>
            {exhibitionPosts.show_term_start} ~ {exhibitionPosts.show_term_end}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            className="h-full w-full flex"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
            }}
            mode="range"
            selected={{ from: startDate, to: endDate }}
            defaultMonth={new Date()}
          />
        </CardContent>
      </Card>

      <Card className="mt-5 lg:hidden">
        <CardHeader>
          <CardTitle>요일별 시간</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {Object.entries(dailyTime).map(([day, time]) => (
              <p key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5 lg:hidden">
        <CardHeader>
          <CardTitle>전화번호</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {exhibitionPosts.gallery_phone_num}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>위치</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg mb-2"></div>
          <p className="font-medium">{exhibitionPosts.show_place}</p>
          <p className="text-sm text-muted-foreground">
            {exhibitionPosts.show_place_detail || "상세 정보 없음"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

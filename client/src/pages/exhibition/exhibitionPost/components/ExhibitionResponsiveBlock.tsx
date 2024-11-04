import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { ResponsiveBlockProps } from "../../types";

export default function ExhibitionResponsiveBlock({
  exhibitionPosts,
  dailyTime,
}: ResponsiveBlockProps) {
  return (
    <div>
      <Card className="hidden lg:block">
        <CardHeader>
          <p className="text-2xl font-bold mb-2">
            {exhibitionPosts.show_price !== 0
              ? `${new Intl.NumberFormat().format(
                  exhibitionPosts.show_price
                )}원`
              : "무료 전시"}
          </p>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-2">예매하기</Button>
          <Button className="w-full mb-2">인스타그램</Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            공유하기
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-5 hidden lg:block">
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

      <Card className="mt-5 hidden lg:block">
        <CardHeader>
          <CardTitle>전화번호</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {exhibitionPosts.gallery_phone_num}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

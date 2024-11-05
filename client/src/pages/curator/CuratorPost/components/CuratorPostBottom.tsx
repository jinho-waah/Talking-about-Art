import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CuratorPostBottomProps } from "../../types";

export default function CuratorPostBottom({
  post,
  businessHours,
  handleToSite,
}: CuratorPostBottomProps) {
  return (
    <Card>
      <CardContent className="grid gap-4 md:grid-cols-2 mt-6">
        <div>
          <h3 className="font-semibold mb-2">전시 이름</h3>
          <p className="text-muted-foreground">{post.show_name}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">전시 위치</h3>
          <p className="text-muted-foreground">{post.show_place}</p>
          <p className="text-muted-foreground">{post.show_place_detail}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">운영 기간</h3>
          {post.show_term_end ? (
            <p className="text-muted-foreground">
              {post.show_term_start} - {post.show_term_end}
            </p>
          ) : (
            <p className="text-muted-foreground">상설전시 입니다</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold mb-2">가격</h3>
          <p className="text-muted-foreground">
            {post.show_price
              ? post.show_price.toLocaleString() + " 원"
              : "무료"}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">운영 시간</h3>
          {Object.entries(businessHours).map(([day, hours]) => (
            <p key={day} className="text-muted-foreground">
              {`${day} ${hours}`}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleToSite} className="w-full">
          상세 정보 보기
        </Button>
      </CardFooter>
    </Card>
  );
}

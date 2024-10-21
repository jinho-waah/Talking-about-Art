import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddCuratorPost() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 포스트 생성 로직 처리
  };

  return (
    <div className="container mx-auto px-1 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">큐레이터 글 작성</CardTitle>
          <CardDescription>
            커뮤니티에 여러분의 생각, 작품, 전시 업데이트를 공유하세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input id="title" placeholder="제목을 입력하세요" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                placeholder="여기에 내용을 작성하세요"
                rows={6}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">전시 선택</Label>
              <div className="mb-6">
                <Input placeholder="전시관, 전시 이름을 찾아주세요" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              포스트 작성
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

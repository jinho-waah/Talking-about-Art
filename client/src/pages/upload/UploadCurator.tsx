import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X } from "lucide-react";
import { Layout } from "../common/components/Layout";

export default function UploadCurator() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 게시글 업로드 로직
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              큐레이터의 인사이트 작성
            </CardTitle>
            <CardDescription>
              최근 전시에 대한 전문적인 의견을 커뮤니티와 공유하세요.
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
                  placeholder="내용을 입력하세요"
                  rows={20}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">카테고리 선택</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artwork">작품 전시</SelectItem>
                    <SelectItem value="exhibition">전시 업데이트</SelectItem>
                    <SelectItem value="review">리뷰</SelectItem>
                    <SelectItem value="discussion">토론</SelectItem>
                    <SelectItem value="event">이벤트 안내</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">이미지 추가</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
                      <Upload className="w-4 h-4" />
                      <span>이미지 추가</span>
                    </div>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`업로드된 이미지 ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="comments" defaultChecked />
                <Label htmlFor="comments">댓글 허용</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                게시글 업로드
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

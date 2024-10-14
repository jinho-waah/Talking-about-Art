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
import { Upload, X } from "lucide-react";
import { Layout } from "../common/components/Layout";

export default function UploadPost() {
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
    // Handle post creation logic here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">새 게시글 작성</CardTitle>
            <CardDescription>
              여러분의 생각, 작품 또는 전시회 소식을 커뮤니티와 공유하세요
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">게시글 제목</Label>
                <Input
                  id="title"
                  placeholder="게시글 제목을 입력하세요"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">게시글 내용</Label>
                <Textarea
                  id="content"
                  placeholder="게시글 내용을 입력하세요"
                  rows={15}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">이미지 업로드</Label>
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
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                게시글 작성
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

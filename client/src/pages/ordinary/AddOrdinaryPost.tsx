import { useState, useEffect } from "react";
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
import { DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { getKstTimeString } from "@/lib/utils";

export default function AddOrdinaryPost() {
  const [title, setTitle] = useState<string>(
    localStorage.getItem("ordinaryPostTitle") || ""
  );
  const [content, setContent] = useState<string>(
    localStorage.getItem("ordinaryPostContent") || ""
  );
  const [images, setImages] = useState<File[]>([]);
  const { userId } = authStore();

  useEffect(() => {
    localStorage.setItem("ordinaryPostTitle", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("ordinaryPostContent", content);
  }, [content]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const imageUrls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await fetch(`${DOMAIN}api/upload/image`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }

        const data = await response.json();
        imageUrls.push(data.imageUrl); // 서버에서 반환한 이미지 경로
      } catch (error) {
        console.error("Error uploading images:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    }

    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrls = await uploadImages();

    const newPost = {
      author_id: userId,
      title: title.trim(),
      content: content.trim(),
      created_at: getKstTimeString(), // 한국 시간 사용
      updated_at: getKstTimeString(), // 한국 시간 사용
      like_count: 0,
      comment_count: 0,
      image_url: JSON.stringify(imageUrls), // 업로드된 이미지 URL 사용
    };

    try {
      const response = await fetch(`${DOMAIN}api/ordinaryPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("게시물 생성에 실패했습니다.");
      }

      alert("게시물이 성공적으로 생성되었습니다.");
      setTitle("");
      setContent("");
      setImages([]);
      localStorage.removeItem("ordinaryPostTitle");
      localStorage.removeItem("ordinaryPostContent");
    } catch (error) {
      console.error(error);
      alert("게시물 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto px-1 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">게시물 작성</CardTitle>
          <CardDescription>
            커뮤니티와 여러분의 생각, 작품, 전시 소식을 공유하세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">게시물 제목</Label>
              <Input
                id="title"
                placeholder="게시물 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">게시물 내용</Label>
              <Textarea
                id="content"
                placeholder="여기에 게시물 내용을 작성하세요"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
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
              게시물 생성
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

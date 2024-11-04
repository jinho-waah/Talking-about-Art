// AddOrdinaryPost.tsx
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
import authStore from "@/store/authStore";
import { getKstTimeString } from "@/lib/utils";
import { AddOrdinaryImage } from "./components/AddOrdinaryImage";
import { AddOrdinaryForm } from "./components/AddOrdinaryForm";
import { useImageUpload } from "./hooks/useImageUpload";
import { usePostOrdinaryPost } from "./hooks/usePostOrdinaryPost";

export default function AddOrdinaryPost() {
  const [title, setTitle] = useState<string>(
    localStorage.getItem("ordinaryPostTitle") || ""
  );
  const [content, setContent] = useState<string>(
    localStorage.getItem("ordinaryPostContent") || ""
  );
  const [images, setImages] = useState<File[]>([]);
  const { userId } = authStore();

  const imageUploadMutation = useImageUpload();
  const postMutation = usePostOrdinaryPost();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrls: string[] = await Promise.all(
      images.map(async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        const imageUrl = await imageUploadMutation.mutateAsync(formData);
        return imageUrl;
      })
    );

    const newPost = {
      author_id: userId,
      title: title.trim(),
      content: content.trim(),
      created_at: getKstTimeString(),
      updated_at: getKstTimeString(),
      like_count: 0,
      comment_count: 0,
      image_url: JSON.stringify(imageUrls),
    };

    postMutation.mutate(newPost);
  };

  return (
    <div className="container mx-auto px-1">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">게시물 작성</CardTitle>
          <CardDescription>
            커뮤니티와 여러분의 생각, 작품, 전시 소식을 공유하세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <AddOrdinaryForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />
            <AddOrdinaryImage
              images={images}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={postMutation.isPending || imageUploadMutation.isPending}
            >
              {postMutation.isPending ? "생성 중..." : "게시물 생성"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

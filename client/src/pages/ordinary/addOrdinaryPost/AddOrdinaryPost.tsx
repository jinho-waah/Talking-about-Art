import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { AddOrdinaryImage } from "./components/AddOrdinaryImage";
import { AddOrdinaryForm } from "./components/AddOrdinaryForm";
import { postOrdinaryPost } from "./api";
import axios from "axios";
import { SERVER_DOMAIN } from "@/constants";

export default function AddOrdinaryPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const imageUploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(
        `${SERVER_DOMAIN}api/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.imageUrl;
    },
    onError: (error) => {
      console.error("Error uploading images:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    },
  });

  const postMutation = useMutation({
    mutationFn: postOrdinaryPost,
    onSuccess: () => {
      alert("게시물이 성공적으로 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["ordinaryPosts"] });
      setTitle("");
      setContent("");
      setImages([]);
      localStorage.removeItem("ordinaryPostTitle");
      localStorage.removeItem("ordinaryPostContent");
      navigate(pageRoutes.ordinaryList);
    },
    onError: (error) => {
      console.error("게시물 생성 중 오류가 발생했습니다.", error);
      alert("게시물 생성 중 오류가 발생했습니다.");
    },
  });

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

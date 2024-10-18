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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { Layout } from "../common/components/Layout";

export default function EditMyPage() {
  const [avatarSrc, setAvatarSrc] = useState("");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              마이 페이지 수정
            </CardTitle>
            <CardDescription>
              프로필을 설정하여 당신을 알려주세요
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarSrc} alt="프로필 이미지" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
                      <Upload className="w-4 h-4" />
                      <span>프로필 이미지 업로드</span>
                    </div>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">자기소개</Label>
                <Textarea
                  id="bio"
                  placeholder="간단한 자기소개 해주세요"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">웹사이트 (선택사항)</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.yourwebsite.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-media">X (선택사항)</Label>
                <Input id="social-media" placeholder="@your_x_id" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-media">Instagram (선택사항)</Label>
                <Input id="social-media" placeholder="@your_instagram_id" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-media">Thread (선택사항)</Label>
                <Input id="social-media" placeholder="@your_thread_id" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                수정 완료
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

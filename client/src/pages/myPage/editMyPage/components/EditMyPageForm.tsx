import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { EditMyPageFormProps } from "../../types";

export function EditMyPageForm({
  profileData,
  handleAvatarUpload,
  handleChange,
}: EditMyPageFormProps) {
  return (
    <CardContent className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profileData.avatarSrc} alt="프로필 이미지" />
          <AvatarFallback>
            {profileData.nickname ? profileData.nickname[0] : "CN"}
          </AvatarFallback>
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
        <Label htmlFor="nickname">이름</Label>
        <Input
          id="nickname"
          placeholder="조진호"
          value={profileData.nickname || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">자기소개</Label>
        <Textarea
          id="bio"
          placeholder="간단한 자기소개 해주세요"
          value={profileData.bio || ""}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">웹사이트 (선택사항)</Label>
        <Input
          id="website"
          placeholder="https://www.yourwebsite.com"
          value={profileData.website || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="x">X (선택사항)</Label>
        <Input
          id="x"
          placeholder="@your_x_id"
          value={profileData.x || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instagram">Instagram (선택사항)</Label>
        <Input
          id="instagram"
          placeholder="@your_instagram_id"
          value={profileData.instagram || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="thread">Thread (선택사항)</Label>
        <Input
          id="thread"
          placeholder="@your_thread_id"
          value={profileData.thread || ""}
          onChange={handleChange}
        />
      </div>
    </CardContent>
  );
}

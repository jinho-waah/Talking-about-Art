import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Twitter, AtSign } from "lucide-react";
import { ProfileData } from "../../types";

export function MyPageForm({
  profileData,
}: {
  profileData: ProfileData | undefined;
}) {
  if (!profileData) {
    return <p>프로필 정보를 불러오는 중입니다...</p>;
  }

  return (
    <CardContent className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profileData.avatarSrc} alt="프로필 이미지" />
          <AvatarFallback>{profileData.nickname[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{profileData.nickname}</h2>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">자기소개</h3>
        <p className="bg-muted rounded-lg p-4">{profileData.bio}</p>
      </div>
      {profileData.website && (
        <div className="space-y-2">
          <h3 className="font-semibold">웹사이트</h3>
          <a
            href={
              /^https?:\/\//.test(profileData.website)
                ? profileData.website
                : `http://${profileData.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            {profileData.website}
          </a>
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-semibold">소셜 미디어</h3>
        <ul>
          {profileData.x && (
            <li className="flex items-center space-x-2">
              <Twitter className="w-5 h-5" />
              <a
                href={`https://x.com/${profileData.x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                @{profileData.x}
              </a>
            </li>
          )}
          {profileData.instagram && (
            <li className="flex items-center space-x-2">
              <Instagram className="w-5 h-5" />
              <a
                href={`https://www.instagram.com/${profileData.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {profileData.instagram}
              </a>
            </li>
          )}
          {profileData.thread && (
            <li className="flex items-center space-x-2">
              <AtSign className="w-5 h-5" />
              <a
                href={`https://www.threads.net/@${profileData.thread}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {profileData.thread}
              </a>
            </li>
          )}
        </ul>
      </div>
    </CardContent>
  );
}

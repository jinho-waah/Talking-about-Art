import { CardContent } from "@/components/ui/card";
import { Instagram, Twitter, AtSign } from "lucide-react";
import { ProfileData } from "../../types";
import { UserAvatar } from "@/pages/common/layout/ui/UserAvatar";

export function MyPageForm({
  profileData,
}: {
  profileData: ProfileData | undefined;
}) {
  if (!profileData) {
    return <p>프로필 정보를 불러오는 중입니다...</p>;
  }
  const socialLinks = [
    {
      type: "Twitter",
      icon: Twitter,
      href: `https://x.com/${profileData.x}`,
      username: profileData.x,
    },
    {
      type: "Instagram",
      icon: Instagram,
      href: `https://www.instagram.com/${profileData.instagram}`,
      username: profileData.instagram,
    },
    {
      type: "Thread",
      icon: AtSign,
      href: `https://www.threads.net/@${profileData.thread}`,
      username: profileData.thread,
    },
  ].filter((link) => link.username);

  return (
    <CardContent className="space-y-6">
      <div className="flex items-center space-x-4">
        <UserAvatar
          userName={profileData.nickname}
          imgUrl={profileData.avatarSrc}
        />
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
          {socialLinks.map(({ type, icon: Icon, href, username }, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon className="w-5 h-5" />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover underline hover:no-underline"
              >
                {type === "Twitter" ? `@${username}` : username}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  );
}

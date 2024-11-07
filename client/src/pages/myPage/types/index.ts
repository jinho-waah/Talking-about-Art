export interface ProfileData {
  avatarSrc: string;
  nickname: string;
  bio: string;
  website: string;
  x: string;
  instagram: string;
  thread: string;
}

export interface EditMyPageFormProps {
  profileData: ProfileData;
  handleSubmit: (e: React.FormEvent) => void;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isPending: boolean;
}

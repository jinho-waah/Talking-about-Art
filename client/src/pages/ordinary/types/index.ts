export interface OrdinaryPost {
  id: number;
  author_id: number;
  author_name: string;
  profile_image: string;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
}

export interface OrdinaryPostWithLike extends OrdinaryPost {
  isLiked: number;
}

export interface UpdateOrdinaryPostProps {
  id: string;
  updatedPost: { title: string; content: string; updated_at: string };
}

export interface Comment {
  id: number;
  nickname: string;
  user_id: number;
  content: string;
  like_count: number;
  created_at: string;
  profile_image: string;
  file_url?: string;
  isLiked?: boolean;
}

export interface UpdateComment {
  commentId: number;
  content: string;
  userId: number;
  file?: File;
}

export interface NewPost {
  author_id: number | null;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  comment_count: number;
  image_url: string;
}

export interface PostOrdinaryPostProps {
  newPost: NewPost;
}

export interface PostOrdinaryPostImageProps {
  formData: FormData;
}
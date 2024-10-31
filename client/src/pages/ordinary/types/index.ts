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

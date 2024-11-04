import { TabTitle } from "@/constants";

export interface PostsListProps {
  title: TabTitle;
}

export interface CuratorPosts {
  id: number;
  curator_id: number;
  curator_name: string;
  show_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  profile_image: string;
  isLiked: boolean;
}

export interface ExhibitionPosts {
  id: number;
  image_url: string[];
  profile_image: string;
  show_name: string;
  show_place: string;
  show_term_start: string | null;
  show_term_end: string | null;
}

export interface OrdinaryPosts {
  id: number;
  author_id: number;
  author_name: string;
  title: string;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  isLiked: boolean;
}

export interface CuratorPostProps {
  post: {
    id: number;
    title: string;
    content: string;
    curator_name: string;
    profile_image: string;
    like_count: number;
    created_at: string;
    isLiked: boolean;
  };
  onClick: (id: number) => void;
}

export interface ExhibitionPostProps {
  post: {
    id: number;
    show_place: string;
    show_name: string;
    profile_image: string;
    show_term_start: string | null;
    show_term_end: string | null;
    image_url: string[];
  };
  onClick: (id: number) => void;
}

export interface OrdinaryPostProps {
  post: {
    id: number;
    author_name: string;
    title: string;
    like_count: number;
    comment_count: number;
    created_at: string;
  };
  onClick: (id: number) => void;
}

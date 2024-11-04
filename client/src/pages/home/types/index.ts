export interface OrdinaryPost {
  id: number;
  title: string;
  author_name: string;
  like_count: number;
  comment_count: number;
}

export interface CuratorPost {
  id: number;
  curator_id: number;
  show_id: number;
  title: string;
  curator_name: string;
  content: string;
  created_at: string;
  updated_at: string;
  like_count: number;
}

export interface ExhibitionPost {
  id: number;
  show_place: string;
  show_name: string;
  show_term_start: string;
  show_term_end: string;
}

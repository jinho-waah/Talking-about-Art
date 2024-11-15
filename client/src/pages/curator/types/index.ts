import { ROLE_TYPE } from "@/constants";

export interface CuratorPostData {
  id: number;
  title: string;
  show_id: number;
  content: string;
  curator_name: string;
  curator_id: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  show_name: string;
  show_term_start: string | null;
  show_term_end: string | null;
  show_place: string | null;
  show_price: number;
  show_link: string;
  show_place_detail: string | null;
  business_hours: string;
  isLiked: number;
}

export interface CuratorPostTopProps {
  post: CuratorPostData;
  userId: number | null;
  role: ROLE_TYPE;
  toggleModal: () => void;
  isModalOpen: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleLikeToggle: () => void;
  isLiked: boolean;
  likeCount: number;
}

export interface Show {
  id: number;
  show_name: string;
  show_place: string;
}

type BusinessHours = {
  [day: string]: string;
};

export interface CuratorPostBottomProps {
  post: CuratorPostData;
  businessHours: BusinessHours;
  handleToSite: () => void;
}

export interface GetCuratorPostProps {
  id: string | undefined;
  userId?: number | null;
}

export interface CuratorPostFormProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  handleOpenModal: () => void;
  showName: string | undefined;
  handleSubmit: () => void;
  isFormValid: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
  searchResults: Show[];
  handleSelectShow: (id: number, name: string) => void;
}

export interface UpdatedPost {
  show_id: number;
  title: string;
  content: string;
  updated_at: string;
}

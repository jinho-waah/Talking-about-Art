export interface Exhibition {
  id: number;
  show_name: string;
  show_artist: string;
  show_term_start: string;
  show_term_end: string;
  show_place: string;
  show_place_detail: string;
  show_price: number;
  show_link: string;
  show_imgs: number;
  image_url: string[];
  instagram_search: string;
  tags: string[];
  gallery_phone_num: string;
  gallery_add_word: string;
  gallery_add_tude: string;
  business_hours: string;
  business_week: string;
  site: string;
}

export interface AddExhibitionPostFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  comboboxOpen: boolean;
  setComboboxOpen: (value: boolean) => void;
  comboboxValue: Combobox | null;
  handleComboboxSelect: (value: Combobox) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  detailLocation: string;
  setDetailLocation: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
  artists: string;
  setArtists: (value: string) => void;
  siteLink: string;
  setSiteLink: (value: string) => void;
  instagramSearch: string;
  setInstagramSearch: (value: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrls: string[];
  handleImageDelete: (index: number) => void;
  handleCheckedFree: (items: number[]) => void;
  handleCheckedPhoto: (items: number[]) => void;
  handleCheckpermanent: (items: number[]) => void;
  handleCheckedOrient: (items: number[]) => void;
  handleCheckedGenre: (items: number[]) => void;
  handleCheckedEra: (items: number[]) => void;
  handleCheckedArtMovement: (items: number[]) => void;
}

export interface ResponsiveBlockProps {
  exhibitionPosts: Exhibition;
  dailyTime: Record<string, string>;
}

export type Combobox =
  | "Seoul"
  | "Busan"
  | "Daegu"
  | "Incheon"
  | "Gwangju"
  | "Daejeon"
  | "Ulsan"
  | "Sejong"
  | "Gyeonggi"
  | "Chungbuk"
  | "Chungnam"
  | "Jeonnam"
  | "Jeonbuk"
  | "Gyeongbuk"
  | "Gyeongnam"
  | "Gangwon"
  | "Jeju"
  | null;

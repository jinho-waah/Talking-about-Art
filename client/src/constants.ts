export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export type ROLE_TYPE = (typeof ROLE)[keyof typeof ROLE] | null;

export type TITLE = "전시 소개" | "전시 예정" | "큐레이터" | "게시글" | null;

export const TAB_TITLES: Record<
  "UPCOMING_EXHIBITION" | "INTRODUCTION" | "CURATOR" | "POSTS",
  TITLE
> = {
  UPCOMING_EXHIBITION: "전시 예정",
  INTRODUCTION: "전시 소개",
  CURATOR: "큐레이터",
  POSTS: "게시글",
};

export const ROLE = {
  ADMIN: "admin",
  GALLERY: "gallery",
  CURATOR: "curator",
  ORDINARY: "ordinary",
} as const;

export enum Post {
  CURATOR = "curatorPosts",
  ORDINARY = "ordinaryPosts",
  EXHIBITION = "exhibitionPosts",
}

export const EVENT_TAB_TITLES = {
  UPCOMING_EVENT: "다가올 이벤트",
  PREVIOUS_EVENT: "지난 이벤트",
  MY_EVENT: "내 이벤트",
} as const;

export const QUERY_KEY = {
  AUTHSTATUS: "authStatus",
  CURATORPOST: "curatorPost",
  ORDINARYPOST: "ordinaryPost",
  ORDINARYPOSTS: "ordinaryPosts",
  SEARCH_SHOW_FOR_CURATORPOST: "searchShowForCuratorPost",
  GALLERY_NAME: "galleryName",
  EXHITION_POST: "exhibitionPost",
  LATEST_CURATOR_POSTS: "latestCuratorPosts",
  LATEST_EXHIBITION_POSTS: "latestExhibitionPosts",
  LATEST_ORDINARY_POSTS: "latestOrdinaryPosts",
  LOGIN: "login",
  MYPAGE: "myPage",
  COMMENTS: "comments",
  EMAIL_CHECK: "emailCheck",
} as const;

export const HOST_DOMAIN = "http://localhost:5173";
// export const HOST_DOMAIN = "https://art-lover.co.kr";
export const SERVER_DOMAIN = "http://localhost:5100/";
// export const SERVER_DOMAIN = "https://art-lover.co.kr/";

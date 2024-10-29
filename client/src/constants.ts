export type TabTitle = "전시 예정" | "전시 소개" | "큐레이터" | "게시글";

export const TAB_TITLES: Record<
  "UPCOMING_EXHIBITION" | "INTRODUCTION" | "CURATOR" | "POSTS",
  TabTitle
> = {
  UPCOMING_EXHIBITION: "전시 예정",
  INTRODUCTION: "전시 소개",
  CURATOR: "큐레이터",
  POSTS: "게시글",
};

export const EVENT_TAB_TITLES = {
  UPCOMING_EVENT: "다가올 이벤트",
  PREVIOUS_EVENT: "지난 이벤트",
  MY_EVENT: "내 이벤트",
};
export const HOST_DOMAIN = "http://localhost:5173";
export const SERVER_DOMAIN = "http://localhost:5100/";
// export const DOMAIN = "http://localhost:5100/";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role, RoleType, SERVER_DOMAIN } from "@/constants";

type AuthStoreState = {
  isLogin: boolean;
  userId: number | null;
  galleryId: number | null;
  userName: string | null;
  role: RoleType;
  isToken: boolean; // Token 상태 추가
  imgUrl: string | null;
};

type AuthStoreActions = {
  actions: {
    setLogin: (
      userId: number,
      galleryId: number,
      role: (typeof Role)[keyof typeof Role],
      userName: string,
      imgUrl: string
    ) => void;
    setLogout: () => void;
    setImgUrl: (imgUrl: string) => void;
  };
};

const deleteCookie = async () => {
  try {
    const response = await fetch(`${SERVER_DOMAIN}api/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      console.log("쿠키 삭제 실패", response.status);
    }
  } catch (error) {
    console.log("쿠키 삭제 중 오류 발생:", error);
  }
};

type AuthStore = AuthStoreState & AuthStoreActions;

const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      userId: null,
      galleryId: null,
      userName: null,
      role: null,
      isToken: false, // 초기값 false
      imgUrl: null,

      actions: {
        setLogin: (
          userId: number,
          galleryId: number,
          role: AuthStoreState["role"],
          userName: string,
          imgUrl: string
        ) =>
          set(() => ({
            isLogin: true,
            userId,
            galleryId,
            userName,
            role,
            isToken: true, // 로그인 성공 시 토큰 존재로 설정
            imgUrl,
          })),
        setLogout: () => {
          deleteCookie();
          set(() => ({
            isLogin: false,
            userId: null,
            galleryId: null,
            userName: null,
            role: null,
            isToken: false, // 로그아웃 시 토큰 상태 제거
            imgUrl: null,
          }));
        },
        setImgUrl: (imgUrl) => {
          set(() => ({
            imgUrl,
          }));
        },
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 key 이름
      partialize: (state) => ({
        isLogin: state.isLogin,
        userId: state.userId,
        galleryId: state.galleryId,
        userName: state.userName,
        role: state.role,
        isToken: state.isToken,
        imgUrl: state.imgUrl,
      }),
    }
  )
);

export default authStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DOMAIN } from "@/constants";

// AuthStore 인터페이스 정의
type AuthStoreState = {
  isLogin: boolean;
  userId: number | null;
  userName: string | null;
  role: "admin" | "exhibition" | "curator" | "general" | null;
  isToken: boolean; // Token 상태 추가
  imgUrl: string | null;
};

type AuthStoreActions = {
  actions: {
    setLogin: (
      userId: number,
      role: AuthStoreState["role"],
      userName: string,
      imgUrl: string
    ) => void;
    setLogout: () => void;
    setImgUrl: (imgUrl: string) => void;
  };
};

const deleteCookie = async () => {
  try {
    const response = await fetch(`${DOMAIN}api/logout`, {
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

// AuthStore 타입
type AuthStore = AuthStoreState & AuthStoreActions;

const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      userId: null,
      userName: null,
      role: null,
      isToken: false, // 초기값 false
      imgUrl: null,

      actions: {
        setLogin: (
          userId: number,
          role: AuthStoreState["role"],
          userName: string,
          imgUrl: string
        ) =>
          set(() => ({
            isLogin: true,
            userId,
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
        userName: state.userName,
        role: state.role,
        isToken: state.isToken,
        imgUrl: state.imgUrl,
      }), // 필요한 모든 상태 저장
    }
  )
);

export default authStore;

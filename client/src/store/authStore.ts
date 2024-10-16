import { create } from "zustand";

// AuthStore 인터페이스 정의
type AuthStoreState = {
  isLogin: boolean;
  userId: number | null;
  role: "admin" | "exhibition" | "curator" | "general" | null;
};

type AuthStoreActions = {
  actions: {
    setLogin: (userId: number, role: AuthStoreState["role"]) => void;
    setLogout: () => void;
  };
};

// AuthStore 타입
type AuthStore = AuthStoreState & AuthStoreActions;

const authStore = create<AuthStore>((set) => ({
  isLogin: false,
  userId: null,
  role: null,
  actions: {
    setLogin: (userId: number, role: AuthStoreState["role"]) =>
      set(() => ({
        isLogin: true,
        userId,
        role,
      })),
    setLogout: () =>
      set(() => ({
        isLogin: false,
        userId: null,
        role: null,
      })),
  },
}));

export default authStore;

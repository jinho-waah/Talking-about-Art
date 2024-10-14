import { create } from "zustand";

interface AuthStore {
  isLogin: boolean;
  user: null | string;
  registerStatus: "idle" | "loading" | "succeded" | "failed";
  registerError: null | Error;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  user: null,
  registerStatus: "idle",
  registerError: null,
}));

export default useAuthStore;

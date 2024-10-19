import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabStore {
  tabTriggerValue: string;
  setTabTriggerValue: (value: string) => void;
}

const useTabTriggerValueStore = create<TabStore>()(
  persist(
    (set) => ({
      tabTriggerValue: "current",
      setTabTriggerValue: (value: string) =>
        set(() => ({ tabTriggerValue: value })),
    }),
    {
      name: "tab-trigger-storage",
    }
  )
);

export default useTabTriggerValueStore;

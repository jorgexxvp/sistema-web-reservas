import { create } from "zustand";

interface ISidebarStoreStore {
  selected: string;
  setSelected: (value: string) => void;
}

export const useSidebarStore = create<ISidebarStoreStore>()((set) => ({
  selected: "",
  setSelected: (value) => {
    set({ selected: value });
  },
}));

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface useSearchBarInterface {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
  Query?: string;
  setQuery: (query: string) => void;
}

const useSearchBar = create<useSearchBarInterface>()(
  immer((set) => ({
    isOpen: undefined,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, Query: undefined }),
    setQuery: (query: string) => set(() => ({ Query: query })),
    Query: undefined,
  }))
);

export default useSearchBar;

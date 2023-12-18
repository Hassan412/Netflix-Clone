import { create } from "zustand";

export interface useSearchModelInterface {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModel = create<useSearchModelInterface>((set) => ({
  isOpen: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useSearchModel
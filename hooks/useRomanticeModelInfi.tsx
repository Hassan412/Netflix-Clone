import { create } from "zustand"


export interface ModelStoreInterface {
    movieId?: number;
    isOpen: boolean;
    openModel: (movieId : number) => void;
    closeModel: () => void;
}

const useRomanticInfoModel = create<ModelStoreInterface>((set)=> ({
    movieId: undefined,
    isOpen: false,
    openModel: (movieId: number) => set({ isOpen: true, movieId }),
    closeModel: ()=> set({isOpen: false, movieId: undefined }),
}))

export default useRomanticInfoModel;
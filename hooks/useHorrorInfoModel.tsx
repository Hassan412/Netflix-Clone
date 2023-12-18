import { create } from "zustand"


export interface ModelStoreInterface {
    isOpen: boolean;
    movieId?: number
    openModel: (movie: number) => void;
    closeModel: () => void;
}

const useHorrorInfoModel = create<ModelStoreInterface>((set)=> ({
    isOpen: false,
    movieId: undefined,
    openModel: (movie: number) => set({ isOpen: true, movieId: movie}),
    closeModel: ()=> set({isOpen: false , movieId: undefined}),
}))

export default useHorrorInfoModel;
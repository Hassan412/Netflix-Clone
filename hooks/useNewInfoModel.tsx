import { create } from "zustand"


export interface ModelStoreInterface {
    isOpen: boolean;
    openModel: (movie: number) => void;
    movieId?: number;
    closeModel: () => void;
}

const useNewInfoModel = create<ModelStoreInterface>((set)=> ({
    isOpen: false,
    movieId: undefined,
    openModel: (movie: number) => set({ isOpen: true , movieId: movie}),
    closeModel: ()=> set({isOpen: false , movieId: undefined}),
}))

export default useNewInfoModel;
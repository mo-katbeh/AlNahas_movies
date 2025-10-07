import { create } from "zustand"

interface MovieMenubarStore{
    isOpen: boolean
    open: ()=> void
    close: ()=> void
}
const useMovieMenubarStore = create<MovieMenubarStore>(set=>({
    isOpen: false,
    open: () =>set({isOpen: true}),
    close: ()=>set({isOpen:false})
}))

export default useMovieMenubarStore;
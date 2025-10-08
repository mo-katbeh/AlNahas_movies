import { create } from "zustand";
import type { MovieType } from "../../../packages/shared/zod/movieType";

interface SelectedMovieState{
    selectedMovie: MovieType | null,
    setSelectedMovie: (movie: MovieType |null)=> void,
    
}
const useSelectedMovieStore = create<SelectedMovieState>((set)=>({
    selectedMovie: null,
    setSelectedMovie: (movie)=>set({selectedMovie: movie}),
}))

export default useSelectedMovieStore;
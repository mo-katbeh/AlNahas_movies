export interface Database {

  watchlist_items: {
    id?: string;
    user_id: string;
    movie_id: string;
    status?: 'WATCHED' | 'TO_WATCH';
    rating?: number | null;
    review?: string | null;
  };
  movies:{
    id: string;
    title: string ;
    year: number ;
    posterUrl?: string | null;
    genres?: string,
    director?: string,
    rating: number,
    description?: string
  }
  users:{
    id: string;
    email: string | null;
    name: string | null;
  }
}
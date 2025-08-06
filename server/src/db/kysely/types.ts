export interface Database {
  categories: {
    id: string;
    name: string | null;
  };
  moviecategories: {
    movieId: string;
    categoryId: string;
  };
  watchlist_items: {
    id: string;
    user_id: string;
    movie_id: string;
    status: 'WATCHED' | 'TO_WATCH';
    rating: number | null;
    review: string | null;
  };
  movies:{
    id: string;
    title: string | null;
    year: number | null;
    categories: {
    id: string;
    name: string;
  }[];

  }
  users:{
    id: string;
    email: string | null;
  }
}
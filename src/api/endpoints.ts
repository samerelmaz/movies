// Base URLs
export const BASE_URLS = {
  api: "/api", // Regular API base
  tmdb: {
    api: "https://api.themoviedb.org/3", // TMDB API
    image: "https://image.tmdb.org/t/p", // TMDB image base
  },
};

export const endpoints = {
  auth: {
    login: `${BASE_URLS.api}/login`,
  },
  movies: {
    list: `${BASE_URLS.tmdb.api}/discover/movie`,
    getImageUrl: (path: string | null, size: string = "w500"): string => {
      if (!path) return "/placeholder-image.jpg";
      return `${BASE_URLS.tmdb.image}/${size}${path}`;
    },
  },
};

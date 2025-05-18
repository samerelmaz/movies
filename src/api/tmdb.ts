import axios from "axios";

// Note: This is hardcoded here for the sake of the exercise, in a real project it would be stored in an environment variable
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTNmNTA5YjZlOWMwNjA2YzU1MzNiYjQwODA0N2IwNSIsIm5iZiI6MTc0NzU4OTc3OS4yOTMsInN1YiI6IjY4MmExYTkzZDViMjFmNjM2ODY0OGE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dYoSlU_WPVAxE1KbGiCf2_x3eQKaELlVQWyItIEfGJ4";

// Maximum items per page TMDB allows
export const MAX_ITEMS_PER_PAGE = 20;

// Create an axios instance configured for TMDB
const tmdbApi = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Add request interceptor to attach token to every request
tmdbApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add it to the request headers
    // Note: TMDB doesn't accept custom headers, it throws CORS error, but this is how we would add it
    if (token) {
      // config.headers["X-Custom-Header"] = `${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default tmdbApi;

import { endpoints, BASE_URLS } from "./endpoints";
import type { LoginRequest, LoginResponse } from "../types/login";
import type { AxiosResponse } from "axios";
import baseApi from "./axios";
import tmdbApi, { MAX_ITEMS_PER_PAGE } from "./tmdb";
import type { MoviesResponse } from "../types/movies";

// Helper to get formatted image URLs
export const getImageUrl = (
  path: string | null,
  size: string = "w500"
): string => {
  if (!path) return "/placeholder-image.jpg";
  return `${BASE_URLS.tmdb.image}/${size}${path}`;
};

export const api = {
  auth: {
    login: async (data: LoginRequest): Promise<AxiosResponse> => {
      const response = await baseApi.post<LoginResponse>(
        endpoints.auth.login,
        data
      );
      return response;
    },
  },
  movies: {
    list: async (page: number = 1) => {
      try {
        const response = await tmdbApi.get<MoviesResponse>(
          endpoints.movies.list,
          {
            params: {
              page,
              sort_by: "popularity.desc",
              include_adult: false,
              language: "en-US",
              per_page: MAX_ITEMS_PER_PAGE,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Return empty results on error
        return { page, results: [], total_pages: 0, total_results: 0 };
      }
    },
    getImageUrl: (path: string | null, size: string = "w500"): string => {
      if (!path) return "";
      return endpoints.movies.getImageUrl(path, size);
    },
  },
};

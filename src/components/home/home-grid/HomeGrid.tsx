import { useEffect, useState, useCallback } from "react";
import MovieCard from "../movie-card/MovieCard";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import styles from "./HomeGrid.module.css";
import type { Movie } from "../../../types/movies";
import { api } from "../../../api/api";

export default function HomeGrid() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load more movies by incrementing the page
  const loadMoreMovies = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  // Use our custom hook for infinite scrolling
  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMoreMovies,
  });

  // Fetch movies when page changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await api.movies.list(currentPage);

        // Append new movies to existing ones
        setMovies((prevMovies) => {
          // Filter out duplicates using Set
          const movieIds = new Set(prevMovies.map((m) => m.id));
          const uniqueNewMovies = data.results.filter(
            (m) => !movieIds.has(m.id)
          );
          return [...prevMovies, ...uniqueNewMovies];
        });

        // Check if we have more pages
        setHasMore(data.page < data.total_pages);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  if (error && movies.length === 0) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {movies.map((movie, index) => {
          // Add ref to last element for infinite scrolling
          const isLastElement = index === movies.length - 1;

          return (
            <div
              key={movie.id}
              className={styles.gridItem}
              ref={isLastElement ? lastElementRef : undefined}
            >
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>

      {/* Loading indicator at the bottom */}
      {loading && (
        <div className={styles.loadingMore}>
          <div className={styles.loading}>Loading more movies...</div>
        </div>
      )}

      {/* No more content indicator */}
      {!hasMore && movies.length > 0 && (
        <div className={styles.endMessage}>
          You've reached the end of the list
        </div>
      )}
    </div>
  );
}

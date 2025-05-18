import { memo } from "react";
import Card from "../../card/Card";
import styles from "./MovieCard.module.css";
import type { Movie } from "../../../types/movies";
import { api } from "../../../api/api";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card>
      <div className={styles.posterContainer}>
        <img
          src={api.movies.getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          className={styles.poster}
          loading="lazy"
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{movie.title}</h3>
        <p className={styles.cardDescription}>
          {movie.overview || "No description available."}
        </p>
      </div>
    </Card>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(MovieCard);

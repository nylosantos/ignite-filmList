import { MovieCard } from "./MovieCard";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import "../styles/content.scss";
import { Header } from "./Header";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface ContentProps {
  genreId: number;
}

export function Content({ genreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then((response) => {
      setMovies(response.data);
    });
    api.get<GenreResponseProps>(`genres/${genreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [genreId]);

  return (
    <div className="container">
      <Header title={selectedGenre.title} />
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

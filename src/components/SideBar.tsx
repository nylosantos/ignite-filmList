import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from "../services/api";
import "../styles/sidebar.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SideBarProps {
  genreId: number;
  handleGenreId: (id: number) => void;
}

export function SideBar({ genreId, handleGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre: any) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleGenreId(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

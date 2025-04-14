import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist"; // ✅ 加這行

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => {
        return <AddToPlaylistIcon {...movie} />; // ✅ 放這裡
      }}
    />
  );
};

export default UpcomingMoviesPage;

import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from "react-query"; 
import Spinner from "../components/spinner"; 

const UpcomingMoviesPage: React.FC = () => {
  const { data: movies, isLoading, isError, error } = useQuery<BaseMovieProps[], Error>(
    ["upcoming"],           
    getUpcomingMovies       
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies || []}
      action={(movie: BaseMovieProps) => {
        return <AddToPlaylistIcon {...movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;

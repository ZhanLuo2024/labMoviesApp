// src/pages/popularMoviesPage.tsx
import React from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getPopularMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";

const PopularMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    "popular",
    getPopularMovies
  );

  if (isLoading) return <Spinner />;

  if (isError) return <h1>{error.message}</h1>;

  const movies = data ?? [];

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => <AddToFavouritesIcon {...movie} />}
    />
  );
};

export default PopularMoviesPage;

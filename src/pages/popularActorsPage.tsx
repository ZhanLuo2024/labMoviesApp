import React from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard";
import { Typography, Grid } from "@mui/material";

const PopularActorsPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery("popular-actors", getPopularActors);

  if (isLoading) return <Spinner />;
  if (isError) return <Typography variant="h5">Error: {(error as Error).message}</Typography>;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Popular People
      </Typography>
      <Grid container justifyContent="center">
        {data.results.map((actor: any) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default PopularActorsPage;

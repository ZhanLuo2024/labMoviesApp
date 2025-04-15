import React from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard";
import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

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
            <Link to={`/people/${actor.id}`}>
                <ActorCard key={actor.id} actor={actor} />
            </Link>
        ))}
      </Grid>
    </>
  );
};

export default PopularActorsPage;

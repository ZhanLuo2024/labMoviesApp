// import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Spinner from "../components/spinner";
import { getActorDetail } from "../api/tmdb-api";

const ActorDetailPage = () => {
  const { id } = useParams();

  const { data: actor, isLoading, isError, error } = useQuery(
    ["actor", id],
    () => getActorDetail(id)
  );

  if (isLoading) return <Spinner />;
  {isError && (
    <Typography variant="h5">
      Error: {(error as Error).message}
    </Typography>
  )}
  

  return (
    <Grid container spacing={2} padding={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>{actor.name}</Typography>
        <Typography variant="h6">Biography</Typography>
        <Typography paragraph>{actor.biography.slice(0, 500)}...</Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>Known For</Typography>
        <Grid container spacing={2}>
          {actor.combined_credits.cast.slice(0, 5).map((movie: any) => (
            <Grid item key={movie.id} xs={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" sx={{ mt: 3 }}>
          🎂 Birthday: {actor.birthday} <br />
          📍 Place of Birth: {actor.place_of_birth} <br />
          🧑 Gender: {actor.gender === 1 ? "Female" : "Male"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ActorDetailPage;

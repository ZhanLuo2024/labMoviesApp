import React from "react";
import Grid from "@mui/material/Grid";
import ActorCard from "../actorCard"; 

const ActorList: React.FC<{ actors: any[] }> = ({ actors }) => {
  return (
    <Grid container spacing={5}>
      {actors.map((actor) => (
        <Grid key={actor.id} item xs={12} sm={6} md={3} lg={2}>
          <ActorCard actor={actor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;

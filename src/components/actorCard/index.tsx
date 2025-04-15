// src/components/actorCard.tsx
import React from "react";
import { Card, CardHeader, CardContent, Typography, CardMedia } from "@mui/material";

interface ActorCardProps {
  actor: {
    id: number;
    name: string;
    profile_path: string | null;
    known_for: { title?: string; name?: string }[];
  };
}

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const knownFor = actor.known_for
    .map((item) => item.title || item.name)
    .slice(0, 3)
    .join(", ");

  return (
    <Card sx={{ width: 250, m: 2 }}>
      <CardMedia
        component="img"
        height="375"
        image={imageUrl}
        alt={actor.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {actor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {knownFor}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActorCard;

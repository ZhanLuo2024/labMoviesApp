import React from "react";
import FantasyForm from "../components/fantasyMovieForm";
import { Typography, Container } from "@mui/material";

const CreateFantasyMoviePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Fantasy Movie
      </Typography>
      <FantasyForm />
    </Container>
  );
};

export default CreateFantasyMoviePage;

import React from "react";
import FantasyForm from "../components/fantasyMovieForm";
import { Typography, Container } from "@mui/material";
import { Navigate } from "react-router-dom";  // ✅ 導入這個才能用 <Navigate />

const CreateFantasyMoviePage: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

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

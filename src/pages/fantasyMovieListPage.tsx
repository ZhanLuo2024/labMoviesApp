import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack
} from "@mui/material";
import { useFantasy } from "../contexts/fantasyContext";

const FantasyMovieListPage: React.FC = () => {
  const { movies } = useFantasy(); // 使用 Context 提供的資料

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Fantasy Movies
      </Typography>

      {movies.length === 0 ? (
        <Typography>No fantasy movies created yet.</Typography>
      ) : (
        movies.map((movie, index) => (
          <Card key={index} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body2" gutterBottom>
                {movie.overview}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                {movie.genres.map((genre, i) => (
                  <Chip key={i} label={genre} />
                ))}
              </Stack>
              <Typography variant="body2">
                🎬 Runtime: {movie.runtime} mins
              </Typography>
              <Typography variant="body2">
                🏭 Production: {movie.productionCompanies}
              </Typography>
              <Typography variant="body2">
                📅 Release: {movie.releaseDate}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default FantasyMovieListPage;

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "../components/movieCard";
import { BaseMovieProps } from "../types/interfaces";

const genresList = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "History",
  "Horror", "Music", "Mystery", "Romance", "Science Fiction",
  "TV Movie", "Thriller", "War", "Western"
];

// 🔧 Genre 名稱轉 ID 對照表（只列出常見）
const genreMap: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

const SearchPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [queryEnabled, setQueryEnabled] = useState(false);

  // 🔍 用 react-query 發送 discover 請求
  const { data, isLoading, isError, refetch } = useQuery(
    ["searchMovies", { title, selectedGenres, yearFrom, yearTo }],
    async () => {
      const genreIds = selectedGenres.map((g) => genreMap[g]).join(",");
      const params: any = {
        api_key: import.meta.env.VITE_TMDB_KEY,
        query: title,
        with_genres: genreIds,
        "primary_release_date.gte": yearFrom ? `${yearFrom}-01-01` : undefined,
        "primary_release_date.lte": yearTo ? `${yearTo}-12-31` : undefined,
      };

      // 移除 undefined 欄位
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );

      const res = await axios.get("https://api.themoviedb.org/3/discover/movie", { params });
      return res.data;
    },
    {
      enabled: queryEnabled, // 手動觸發查詢
    }
  );

  const handleSearch = () => {
    setQueryEnabled(true);
    refetch();
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}
      >
        <TextField
          label="Movie Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Genres</InputLabel>
          <Select
            multiple
            value={selectedGenres}
            onChange={(e) => setSelectedGenres(e.target.value as string[])}
            input={<OutlinedInput label="Genres" />}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {genresList.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                <ListItemText primary={genre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Release Year From"
            type="number"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            fullWidth
            inputProps={{ min: 1900, max: 2100 }}
          />
          <TextField
            label="Release Year To"
            type="number"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            fullWidth
            inputProps={{ min: 1900, max: 2100 }}
          />
        </Box>

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Result */}
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Failed to fetch results.</Alert>}
      {!isLoading && data?.results?.length === 0 && (
        <Typography>No results found.</Typography>
      )}

      {Array.isArray(data?.results) && data.results.length > 0 && (
        <Grid container spacing={3}>
          {data.results.map((movie: BaseMovieProps) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchPage;

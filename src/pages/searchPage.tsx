import React from "react";
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
} from "@mui/material";

const genresList = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "History",
  "Horror", "Music", "Mystery", "Romance", "Science Fiction",
  "TV Movie", "Thriller", "War", "Western"
];

const SearchPage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 4,
        }}
      >
        {/* Title */}
        <TextField label="Movie Title" fullWidth />

        {/* Genres Multi-Select */}
        <FormControl fullWidth>
          <InputLabel>Genres</InputLabel>
          <Select
            multiple
            input={<OutlinedInput label="Genres" />}
            renderValue={(selected) => (selected as string[]).join(", ")}
            value={[]} // 預設空值，未接邏輯
          >
            {genresList.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={false} /> {/* 預設未選中 */}
                <ListItemText primary={genre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year Range */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Release Year From"
            type="number"
            fullWidth
            inputProps={{ min: 1900, max: 2100 }}
          />
          <TextField
            label="Release Year To"
            type="number"
            fullWidth
            inputProps={{ min: 1900, max: 2100 }}
          />
        </Box>

        {/* Search Button */}
        <Box>
          <Button variant="contained">Search</Button>
        </Box>
      </Box>

      {/* 搜尋結果區塊 */}
    </Box>
  );
};

export default SearchPage;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useFantasy } from "../../contexts/fantasyContext"
import { useNavigate } from "react-router-dom";

interface FantasyMovieFormData {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  runtime: number;
  productionCompanies: string;
}

const genreOptions = [
  "Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi"
];

const FantasyMovieForm: React.FC = () => {
    const navigate = useNavigate();
    const { addMovie } = useFantasy(); 
    const { control, handleSubmit, reset } = useForm<FantasyMovieFormData>();
    const [success, setSuccess] = useState(false);

    const onSubmit = (data: FantasyMovieFormData) => {
        addMovie(data);         
        setSuccess(true);       
        reset();                
        setTimeout(() => {
          navigate("/fantasy/list");  
        }, 500); 
      };
      

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Fantasy Movie
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Title" margin="normal" required />
          )}
        />

        <Controller
          name="overview"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Overview" margin="normal" multiline rows={4} />
          )}
        />

        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="genres-label">Genres</InputLabel>
              <Select
                labelId="genres-label"
                multiple
                {...field}
                value={field.value || []}
                onChange={(e) => field.onChange(e.target.value)}
                renderValue={(selected) => (selected as string[]).join(", ")}
              >
                {genreOptions.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <Checkbox checked={field.value?.includes(genre)} />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="releaseDate"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Release Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} />
          )}
        />

        <Controller
          name="runtime"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Runtime (min)" type="number" margin="normal" />
          )}
        />

        <Controller
          name="productionCompanies"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Production Companies" margin="normal" />
          )}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Fantasy movie created!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FantasyMovieForm;

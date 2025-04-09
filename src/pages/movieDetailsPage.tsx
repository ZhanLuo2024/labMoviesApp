// src/pages/movieDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MovieDetails from "../components/movieDetails";
import MovieHeader from "../components/headerMovie";
import { MovieDetailsProps, MovieImage } from "../types/interfaces";

const styles = {
  imageListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: "100%",
    height: "auto",
  },
};

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
  const [images, setImages] = useState<MovieImage[]>([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setImages(data.posters ?? []));
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <>
      <MovieHeader {...movie} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList sx={styles.imageListRoot} cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} sx={styles.gridListTile} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt="poster"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>
        <Grid item xs={9}>
          <MovieDetails movie={movie} images={images} />
        </Grid>
      </Grid>
    </>
  );
};

export default MovieDetailsPage;

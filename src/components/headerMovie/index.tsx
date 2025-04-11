import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MovieDetailsProps } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // title 左右留點距離
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  const [isFav, setIsFav] = useState(false);

  // 檢查此電影是否已加入 localStorage 收藏清單
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    const matched = storedFavourites.find((m: MovieDetailsProps) => m.id === movie.id);
    setIsFav(!!matched);
  }, [movie.id]);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* title 包含紅心的區塊 */}
      <div style={styles.titleWrapper}>
        <IconButton aria-label="favourite" disabled>
          {isFav ? (
            <FavoriteIcon color="error" fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </IconButton>

        <Typography variant="h4" component="h3">
          {movie.title}{" "}
          <a href={movie.homepage}>
            <HomeIcon color="primary" fontSize="large" />
          </a>
          <br />
          <span>{`${movie.tagline}`} </span>
        </Typography>
      </div>

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;

import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    context.addToMustWatch(movie); // ✅ Add to must-watch
  };

  return (
    <PlaylistAddIcon
      color="primary"
      fontSize="large"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default AddToPlaylistIcon;

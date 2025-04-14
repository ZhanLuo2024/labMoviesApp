import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";

const AddToPlaylistIcon: React.FC<BaseMovieProps> = () => {
  return <PlaylistAddIcon color="primary" fontSize="large" />;
};

export default AddToPlaylistIcon;

import React from "react";
import { useParams } from "react-router-dom";
import MovieProfile from "./MovieProfile";
import ShowTime from "./ShowTime";
import { Box } from "@mui/material";

export default function Details() {
  const { movieId } = useParams();
  console.log(movieId);
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to top, rgb(10, 32, 41), transparent 100%)",
      }}
    >
      <MovieProfile movieId={movieId} />
      <ShowTime movieId={movieId} />
    </Box>
  );
}

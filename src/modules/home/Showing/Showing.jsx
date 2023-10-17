import React from "react";
import ShowList from "./ShowingList";
import ShowingSelect from "./ShowingSelect";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../apis/movieAPI";
import { Box } from "@mui/material";

export default function Showing() {
  const { data = [] } = useQuery({
    queryKey: ["film"],
    queryFn: getMovie,
  });

  return (
    <Box id="showing">
      <ShowingSelect listFilms={data} />
      <ShowList />
    </Box>
  );
}

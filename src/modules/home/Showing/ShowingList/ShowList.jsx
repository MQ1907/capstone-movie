import React from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { getMovie } from "../../../../apis/movieAPI";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container } from "@mui/material";
import { Slide } from "../styledShowing";
import ShowingListItem from "./ShowingListIem/ShowingListItem";

export default function ShowList() {
  const settings = {
    className: "center",

    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    // slidesPerRow: 4,
    dots: true,
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovie,
  });

  return (
    <Container sx={{ paddingBottom: "16px" }}>
      <Box>
        <Slider {...settings}>
          {data.map((movie) => {
            return <ShowingListItem key={movie.maPhim} movie={movie} />;
          })}
        </Slider>
      </Box>
    </Container>
  );
}

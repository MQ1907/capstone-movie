import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getMovieDetails } from "../../../apis/movieAPI";
import { Box, Button, Container, Modal, Rating, Typography } from "@mui/material";
import dayjs from "dayjs";
import ReactPlayer from "react-player";

export default function MovieProfile({ movieId }) {
   const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const { data: movie = [], isLoading } = useQuery({
    queryKey: ["movieProfile", movieId],
    queryFn: () => getMovieDetails(movieId),
  });
  console.log(movie);
  return (
    <Container sx={{ paddingTop: "100px" }}>
      <Box display={"flex"}>
        <Box
          sx={{
            display: "flex",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            width={"50%"}
            height={"314px"}
            style={{ borderRadius: "5px" }}
          />
          <Box sx={{ paddingLeft: "10px" }}>
            <Typography variant="h5" component="h4">
              {dayjs(movie.ngayKhoiChieu).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="h4" component="h3" m={"10px 0"}>
              {movie.tenPhim}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Trailer
            </Button>
            <Box sx={{ marginTop: "10px" }}>
              <Rating
                readOnly={true}
                name="customized-10"
                defaultValue={Number(movie.danhGia)}
                value={Number(movie.danhGia)}
                max={10}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
          }}
        >
          <ReactPlayer width={"100%"} height={"100%"} url={movie.trailer} />
        </Box>
      </Modal>
    </Container>
  );
}

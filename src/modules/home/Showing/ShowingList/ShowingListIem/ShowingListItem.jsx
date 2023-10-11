import React from "react";
import { Slide } from "../../styledShowing";
import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextTitle } from "../../../../../components/styed/styledText";
import {
  Button,
  ButtonMovie,
} from "../../../../../components/styed/styledButton";
import { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";

export default function ShowingListItem({ movie }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <>
      <Slide>
        <Box
          onClick={handleOpen}
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <img
            width={"100%"}
            height={"300px"}
            src={movie.hinhAnh}
            alt={movie.tenPhim}
          />

          <Box
            position={"absolute"}
            sx={{
              backgroundColor: "#00000080",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0,
              transition: "all .5s",

              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <PlayCircleOutlineIcon fontSize="large" />
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#00000080",
            color: "#fff",
            padding: "10px",
            borderRadius: "0 0 10px 10px ",
          }}
        >
          <TextTitle
            whiteSpace="nowrap"
            fs="18px"
            fw="600"
            textOverflow="ellipsis"
            p="10px 0 0 0"
          >
            {movie.tenPhim}
          </TextTitle>
          <TextTitle
            as="p"
            m="0 0 8px 0"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color="#fff"
            fs="14px"
            fw="700"
          >
            {movie.moTa}
          </TextTitle>
          <ButtonMovie>
            <Button
              p="10px 20px"
              m="10px 0 "
              width="100%"
              onClick={() => navigate(`movies/${movie.maPhim}`)}
            >
              Mua vé
            </Button>
          </ButtonMovie>
        </Box>
      </Slide>

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
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getMovieShowTimes } from "../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ShowTime({ movieId }) {

  const navigate = useNavigate()

  const [cinemas, setCinemas] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data = {}, isLoading } = useQuery({
    queryKey: ["movieShowTimes", movieId],
    queryFn: () => getMovieShowTimes(movieId),
    enabled: !!movieId,
  });

  const cinemaSystems = data.heThongRapChieu || [];

  const handleGetCinemaSystem = (cinemaSystemsId) => {
    const found = cinemaSystems.find(
      (item) => item.maHeThongRap === cinemaSystemsId
    );

    setCinemas(found.cumRapChieu);
  };

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems]);
  console.log(cinemaSystems)
  return (
    <Container>
      <Box sx={{ backgroundColor: "white" }}>
        {cinemaSystems.length !== 0  ? (
          <>
            <Box sx={{ width: "100%", paddingTop: "64px" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  centered
                >
                  {cinemaSystems.map((cinemaSystem, index) => {
                    return (
                      <Tab
                        key={cinemaSystem.maHeThongRap}
                        sx={{
                          backgroundImage: `url(${cinemaSystem.logo})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          // width: "25%",
                          margin: "0 20px",
                        }}
                        {...a11yProps(index)}
                      />
                    );
                  })}
                </Tabs>
              </Box>
            </Box>
            <Box sx={{}}>
              {/**render danh sách rap */}
              {cinemas.map((cinema, index) => {
                return (
                  <CustomTabPanel key={cinema.maCumRap} value={value} index={index}>
                    <h3>{cinema.tenCumRap}</h3>
                    {/**render lịch chiếu giờ chiếu */}
                    {cinema.lichChieuPhim.map((showtime) => {
                      const time = dayjs(showtime.ngayChieuGioChieu).format(
                        "DD-MM-YYYY ~ HH:mm"
                      );

                      return (
                        //Onclick{()=>navigate(`/tickets/${showtime.maLichChieu}`)}
                        <Button
                          key={showtime.maLichChieu}
                          color="secondary"
                          variant="outlined"
                          sx={{
                            marginRight: "10px",
                            color: "red",
                            opacity: "0.7",
                            "&:hover": { opacity: "1" },
                          }}
                          onClick={() => navigate(`/tickets/${showtime.maLichChieu}`)}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </CustomTabPanel>
                );
              })}
            </Box>
          </>
        )
          :
          (
            <Box sx={{ width: "100%", padding: "64px 0 " }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", textAlign:"center" }}>
                <h1>Lịch chiếu đang được cập nhật</h1>
              </Box>
            </Box>
          )
        }
      </Box>
    </Container>
  );
}

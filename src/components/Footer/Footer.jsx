
import React from "react";
import { BackGroundFooter } from "../styed/styledBg";
import { Box, Container, Grid } from "@mui/material";
import { TextFooter, TextTitle } from "../styed/styledText";
import { LogoFooter } from "../styed/styledFooter";
import { getCinema } from "../../apis/cinemaAPI";
import { useQuery } from "@tanstack/react-query";
import GitHubIcon from "@mui/icons-material/GitHub";
import FaceBook from "@mui/icons-material/Facebook";
import Facebook from "@mui/icons-material/Facebook";



export default function Footer() {
   const { data = [], isLoading } = useQuery({
     queryKey: ["footerCinema"],
     queryFn: getCinema,
   });

  return (
    <BackGroundFooter>
      <Container>
        <Box
          sx={{ display: "flex" }}
          justifyContent={"space-evenly"}
          maxWidth={"33,3%"}
        >
          <Box>
            <TextTitle as="h6" color="white" fs="12px">
              TIX
            </TextTitle>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={5}>
                <TextFooter fs="12px" textdecoration="none">
                  FAQ
                </TextFooter>
              </Grid>
              <Grid item xs={5}>
                <TextFooter fs="12px" textdecoration="none">
                  Brand Guidelines
                </TextFooter>
              </Grid>
              <Grid item xs={5}>
                <TextFooter fs="12px" textdecoration="none">
                  Thỏa thuận sử dụng
                </TextFooter>
              </Grid>
              <Grid item xs={5}>
                <TextFooter fs="12px" textdecoration="none">
                  Chính sách bảo mật
                </TextFooter>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <TextTitle color="white" fs="12px">
              Hệ Thống Rạp
            </TextTitle>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(2, 120px)" }}
            >
              {data.map((item) => {
                return (
                  <LogoFooter key={item.maHeThongRap}>
                    <img
                      src={item.logo}
                      alt={item.tenHeThongRap}
                      width="100%"
                      height="100%"
                      style={{ display: "inline-block" }}
                    />
                  </LogoFooter>
                );
              })}
            </Box>
          </Box>
          <Box>
            <TextTitle color="white" fs="12px">
              Contact
            </TextTitle>
            <Box>
              <Box>
                <LogoFooter
                  href="https://github.com/MQ1907/classes.git"
                  target="_blank"
                  display="flex"
                  alignItems="center"
                >
                  <GitHubIcon fontSize="large" />
                  <TextFooter ml="10px">GitHub</TextFooter>
                </LogoFooter>
              </Box>
              <Box>
                <LogoFooter
                  href="https://www.facebook.com/profile.php?id=100013845758286"
                  target="_blank"
                  display="flex"
                  alignItems="center"
                >
                  <Facebook fontSize="large" />
                  <TextFooter ml="10px">FaceBook</TextFooter>
                </LogoFooter>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </BackGroundFooter>
  );
}

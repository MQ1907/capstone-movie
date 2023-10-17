
import React from "react";
import { BackGroundFooter } from "../styed/styledBg";
import { Box, Container, Grid } from "@mui/material";
import { TextFooter, TextTitle } from "../styed/styledText";



export default function Footer() {
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
          
          </Box>
          <Box>
            <TextTitle>3</TextTitle>
          </Box>
        </Box>
      </Container>
    </BackGroundFooter>
  );
}

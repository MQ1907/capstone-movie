import React from 'react'
import { BackGroundAdver} from '../styed/styledBg'
import { Box, Container } from '@mui/material'
import { TextTitle } from '../styed/styledText'
import { Button, ButtonMovie } from '../styed/styledButton'

export default function Advertise() {
  return (
     <BackGroundAdver>
      <Container sx={{ position: "relative", zIndex: "10"  }} >
        <Box>
          <TextTitle as="h1" color={"#fff"} fw="700">
            Ứng dụng tiện lợi dành cho <br /> người yêu điện ảnh
          </TextTitle>
          <TextTitle color={"#fff"} as="p" fs="18px" p="20px 0 ">
            Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm <br />{" "}
            rạp và đổi quà hấp dẫn
          </TextTitle>
          <ButtonMovie m="0 0 17px 0 ">
            <Button p="20px 30px">App Miễn Phí - Tải về ngay</Button>
          </ButtonMovie>
          <TextTitle as="p" color={"#fff"} fs="18px" >
            TIX có 2 phiên bản <TextTitle as="a" color={"#fff"} >IOS</TextTitle> & <TextTitle as="a" color={"#fff"}>Android</TextTitle>
          </TextTitle>
        </Box>
      </Container>
    </BackGroundAdver>
  )
}

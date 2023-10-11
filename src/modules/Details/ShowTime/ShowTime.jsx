import { useQuery } from '@tanstack/react-query'
import React, { useState ,useEffect } from 'react'
import { getMovieShowTimes } from '../../../apis/cinemaAPI'
import dayjs from "dayjs"


export default function ShowTime({movieId}) {
  const [cinemas ,setCinemas] = useState([])

  const{data = {}, isLoading} = useQuery({
    queryKey:["movieShowTimes" , movieId],
    queryFn:()=>getMovieShowTimes(movieId),
    enabled:!!movieId
  })
 


  const cinemaSystems = data.heThongRapChieu || []

  const handleGetCinemaSystem =(cinemaSystemsId)=>{
  const found = cinemaSystems.find((item)=> item.maHeThongRap===cinemaSystemsId)

    setCinemas(found.cumRapChieu);
  }

  useEffect(()=>{
    if(cinemaSystems.length > 0){
      setCinemas(cinemaSystems[0].cumRapChieu)
    }

  },[cinemaSystems])

  return (
     <div>
      {cinemaSystems.map((cinemaSystem)=>{
        return (
          <div key={cinemaSystem.maHeThongRap}>
          <img src={cinemaSystem.logo} alt="" width={50} height={50} onClick={()=>handleGetCinemaSystem(cinemaSystem.maHeThongRap)}/> 
        </div>
        )
      })}

      {/**render danh sách rap */}
      {cinemas.map((cinema)=>{
        return (
          <div>
          <h3>{cinema.tenCumRap}</h3>
           {/**render lịch chiếu giờ chiếu */}
          {cinema.lichChieuPhim.map((showtime)=>{
            const date = new Date(showtime.ngayChieuGioChieu)
            const time = dayjs(showtime.ngayChieuGioChieu) . format("DD-MM-YYYY ~ HH:mm")
            return (

              //Onclick{()=>navigate(`/tickets/${showtime.maLichChieu}`)}
              <button>{time}</button>
            )
          })}
          </div>
        )
      })}
   
     </div>
  )
}


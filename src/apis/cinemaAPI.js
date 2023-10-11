import fetcher from "./fetcher";

export async function getMovieShowTimes(movieId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getCinema() {
  try {
    const response = await fetcher.get(`/QuanLyRap/LayThongTinHeThongRap`);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

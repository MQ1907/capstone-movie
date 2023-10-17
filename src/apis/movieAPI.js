import axios from "axios";
import fetcher from "./fetcher";

export async function getBanner() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovie() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP09",
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
    });
    return response?.data.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function addMovie(movie) {
  try {
    const response = await fetcher.post(
      "/QuanLyPhim/ThemPhimUpLoadHinh",
      movie
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function editMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyPhim/CapNhatPhimUpload", movie);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function deleteMovie(movie) {
  try {
    const response = await fetcher.delete("/QuanLyPhim/XoaPhim/",  {
      params: {
        MaPhim: movie,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

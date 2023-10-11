import fetcher from "./fetcher";

export const signin = async (payload) => {
  console.log(payload);
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    console.log(response);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};

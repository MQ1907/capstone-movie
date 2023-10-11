import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../../apis/userAPI";
import { Box, Button, TextField } from "@mui/material";

import { object, string } from "yup";
import { BackGroundSign } from "../../../../components/styed/styledBg";
import { Error } from "../../../../components/styed/styledText";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự , 1 kí tự hoa và 1 số"
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
});

export default function Signup() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },

    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const onSubmit = (values) => {
    handleSignup(values);

    //Gọi API đăng kí
  };

  const onError = (error) => {
    console.log(error);

    //Gọi API đăng kí
  };

  return (
    <BackGroundSign>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          position: "relative",
          zIndex: "10",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>Đăng Kí</h1>
          <div>
            <TextField
              sx={{ marginBottom: "15px" }}
              fullWidth="100%"
              id="Tài Khoản"
              label="Tài Khoản"
              variant="outlined"
              error={!!errors.taiKhoan}
              helperText={errors.taiKhoan?.message}
              {...register("taiKhoan")}
            />
          </div>
          <div>
            <TextField
              sx={{ marginBottom: "15px" }}
              fullWidth="100%"
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              error={!!errors.matKhau}
              helperText={errors.matKhau?.message}
              {...register("matKhau")}
            />
          </div>
          <div>
            <TextField
              sx={{ marginBottom: "15px" }}
              fullWidth="100%"
              id="Email"
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div>
            <TextField
              sx={{ marginBottom: "15px" }}
              fullWidth="100%"
              id="Họ Tên"
              label="Họ Tên"
              variant="outlined"
              error={!!errors.hoTen}
              helperText={errors.hoTen?.message}
              {...register("hoTen")}
            />
          </div>
          <div>
            <TextField
              sx={{ marginBottom: "15px" }}
              fullWidth="100%"
              id="Số Điện Thoại"
              label="Số Điện Thoại"
              variant="outlined"
              error={!!errors.soDt}
              helperText={errors.soDt?.message}
              {...register("soDt")}
            />
          </div>
          <Button
            fullWidth="100%"
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            Đăng Ký
          </Button>
          {error && <Error>{error}</Error>}
        </form>
      </Box>
    </BackGroundSign>
  );
}

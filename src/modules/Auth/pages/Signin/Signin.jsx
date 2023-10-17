import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../../apis/userAPI";
import { useNavigate, Navigate } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import { useSearchParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Error } from "../../../../components/styed/styledText";
import { BackGroundSign } from "../../../../components/styed/styledBg";

export default function Signin() {
  const navigate = useNavigate();
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const [searchParams] = useSearchParams();

  const signinSchema = object({
    taiKhoan: string().required("Tài khoản không được để trống"),
    matKhau: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự , 1 kí tự hoa và 1 số"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinSchema),
  });

  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };


  
  //CurrentUser khác null => user đã đăng nhập => điều hướng về Home
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

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
        <h1>Đăng Nhập </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              sx={{ marginBottom: "15px" }}
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
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              error={!!errors.matKhau}
              helperText={errors.matKhau?.message}
              {...register("matKhau")}
            />
          </div>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Đăng Nhập
          </Button>
          {error && <Error>{error}</Error>}
        </form>
      </Box>
    </BackGroundSign>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editMovie, getMovieDetails } from "../../../apis/movieAPI";
import dayjs from "dayjs";
import { Box, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addMovieSchema = object({
  tenPhim: string().required("Tên Phim không được để trống"),
  biDanh: string()
    .required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  hinhAnh: mixed().required("Hình ảnh không được để trống"),
  trailer: mixed().required("trailer không được để trống"),
  ngayKhoiChieu: mixed().required("Ngày khởi chiếu không được để trống"),
});


export default function EditMovie({ handleClose, id }) {



  const [rating, setRating] = useState(2);

  const { data: infoMovie = {}, isLoading } = useQuery({
    queryKey: ["infoOfMovie", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id
  })

  console.log(id)
  console.log(infoMovie)
  console.log(infoMovie.maPhim)





  const { register, reset, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 2,
    },
    resolver: yupResolver(addMovieSchema),

  });

  console.log(infoMovie)

  console.log(!!id)
  useEffect(() => {
    if (!!id) {
      // bản chất nó trong if là tự ép kiểu rồi
      // setValue("maPhim", infoMovie.maPhim);
      setValue("tenPhim", infoMovie.tenPhim);
      setValue("biDanh", infoMovie.biDanh);
      setValue("moTa", infoMovie.moTa);
      setImgPreview(infoMovie?.hinhAnh);
      setValue("trailer", infoMovie.trailer);
      // setValue(watch("ngayKhoiChieu"));
      setValue("ngayKhoiChieu", dayjs(infoMovie.ngayKhoiChieu).format("YYYY-MM-DD"));
      setValue("sapChieu", infoMovie?.sapChieu);
      setValue("dangChieu", infoMovie?.dangChieu);
      setValue("hot", infoMovie?.hot);
      if (infoMovie.danhGia !== undefined) {
        setRating(infoMovie.danhGia);
      }
    }
  }, [infoMovie, setValue])
  //infoMovie, setValue



  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values)
      const formData = new FormData();
      formData.append("maPhim", id);
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP13");
      formData.append("hot", values.hot);
      formData.append("dangChieu", values.dangChieu);
      formData.append("sapChieu", values.sapChieu);
      formData.append("danhGia", values.danhGia);
      return editMovie(formData);
    },

    onSuccess: () => {
      //Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidationQueries để gọi lại API get danh sách phim
      handleClose()
      setImgPreview("")

      reset()
    },
    onError: () => {

    },

  });

  // ======

  const hinhAnh = watch("hinhAnh");

  console.log(hinhAnh)

  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    //Chạy vào useEffect callback khi giá trị của hình Ảnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImgPreview(event.target.result);
    }
  }, [hinhAnh]);



  // ======= end


  const rootRef = useRef(null);

  // console.log(watch("ngayKhoiChieu"))
  console.log(infoMovie.ngayKhoiChieu)

  return (


    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          fullWidth="100%"
          id="tenPhim"
          label="Tên Phim"
          variant="outlined"
          error={!!errors.tenPhim}
          helperText={errors.tenPhim?.message}
          {...register("tenPhim")}
          InputLabelProps={{
            shrink: true, // Label sẽ được hiển thị lên trên
          }}
        />
        {/* <input placeholder="Tên Phim" {...register("tenPhim")} /> */}
      </div>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          fullWidth="100%"
          id="biDanh"
          label="Bí Danh"
          variant="outlined"
          error={!!errors.biDanh}
          helperText={errors.biDanh?.message}
          {...register("biDanh")}
          InputLabelProps={{
            shrink: true, // Label sẽ được hiển thị lên trên
          }}
        />
        {/* <input placeholder="Bí danh" {...register("biDanh")} /> */}
      </div>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          fullWidth="100%"
          id="moTa"
          label="Mô tả"
          variant="outlined"
          error={!!errors.moTa}
          helperText={errors.moTa?.message}
          {...register("moTa")}
          InputLabelProps={{
            shrink: true, // Label sẽ được hiển thị lên trên
          }}
        />
        {/* <input placeholder="Mô tả" {...register("moTa")} /> */}
      </div>
      <div>
        <input
          style={{ marginBottom: "15px" }}
          fullWidth="100%"
          id="hinhAnh"
          label="Hình Ảnh"
          type="file"
          variant="outlined"
          error={!!errors.hinhAnh}
          helperText={errors.hinhAnh?.message}
          {...register("hinhAnh")}
          InputLabelProps={{
            shrink: true, // Label sẽ được hiển thị lên trên
          }}
        />
        {/* event.target.files */}
        {/* <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} /> */}
        {imgPreview && <img src={imgPreview} alt="preview" width={200} height={100} />}
      </div>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          fullWidth="100%"
          id="trailer"
          label="Trailer"
          variant="outlined"
          error={!!errors.trailer}
          helperText={errors.trailer?.message}
          {...register("trailer")}
          InputLabelProps={{
            shrink: true, // Label sẽ được hiển thị lên trên
          }}
        />
        {/* <input placeholder="Trailer" {...register("trailer")} /> */}
      </div>
      <div>
        {/* <TextField
          sx={{ marginBottom: "15px" }}
          fullWidth="100%"
          id="ngayKhoiChieu"
          label="Ngày Khởi Chiếu Phim"
          type="date"
          variant="outlined"
          error={!!errors.ngayKhoiChieu}
          helperText={errors.ngayKhoiChieu?.message}
          {...register("ngayKhoiChieu", {
            setValueAs: (value) => {
              return dayjs(value).format("DD/MM/YYYY");
            },
          })}

          InputLabelProps={{
            shrink: true, // Label sẽ được hiển thị lên trên
          }}
        /> */}

        <TextField
          fullWidth
          label="Ngày khởi chiếu"
          type="date"
          color="success"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("ngayKhoiChieu", {
            setValueAs: (values) => {
              return dayjs(values).format("DD/MM/YYYY");
            },
          })}
          error={!!errors.ngayKhoiChieu}
          helperText={errors.ngayKhoiChieu && errors.ngayKhoiChieu.message}
        />
      </div>
      <div>
        <FormControl >
          <FormLabel id="demo-row-radio-buttons-group-label">Sắp Chiếu</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" {...register("sapChieu")}
          >

            <FormControlLabel value={true} control={<Radio />} label="True" />
            <FormControlLabel value={false} control={<Radio />} label="False" />

          </RadioGroup>

        </FormControl>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Đang Chiếu</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"  {...register("dangChieu")}
          >

            <FormControlLabel value={true} control={<Radio />} label="True" />
            <FormControlLabel value={false} control={<Radio />} label="False" />

          </RadioGroup>

        </FormControl>
        <FormControl >
          <FormLabel id="demo-row-radio-buttons-group-label">Hot</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" {...register("hot")}
          >

            <FormControlLabel value={true} control={<Radio />} label="True" />
            <FormControlLabel value={false} control={<Radio />} label="False" />

          </RadioGroup>

        </FormControl>
      </div>

      <button>Chỉnh Sửa</button>
    </form>


  );
}

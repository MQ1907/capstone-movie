import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../apis/movieAPI";
import dayjs from "dayjs";

export default function AddMovie() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP13");

      return addMovie(formData);
    },

    onSuccess:()=>{
      //Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidationQueries để gọi lại API get danh sách phim

    },
    onError:()=>{

    },

  });


  const hinhAnh = watch("hinhAnh");

  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    //Chạy vào useEffect callback khi giá trị của hình Ảnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=(event)=>{
      setImgPreview (event.target.result);
    }
  }, [hinhAnh]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Tên Phim" {...register("tenPhim")} />
      </div>
      <div>
        <input placeholder="Bí danh" {...register("biDanh")} />
      </div>
      <div>
        <input placeholder="Mô tả" {...register("moTa")} />
      </div>
      <div>
        {/* event.target.files */}
        <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} />
        <img src={imgPreview} alt="preview" width={200} height={100} />
      </div>
      <div>
        <input placeholder="Trailer" {...register("trailer")} />
      </div>
      <div>
        <input
          type="date"
          placeholder="Ngày khởi chiếu"
          {...register("ngayKhoiChieu", {
            setValueAs: (value) => {
              return dayjs(value).format("DD/MM/YYYY");
            },
          })}
        />
      </div>

      <button>Tên Phim</button>
    </form>
    // <div>
    //   <h1>AdminMovie</h1>
    //   <AddMovie />
    // </div>
  );
}

# Cấu trúc project

src
- components/:
  -Chứa các component thuần về UI, được tái sử dụng ở nhiều nơi 
  - Các component này thường không bao gồm logic của ứng dụng (Call API,...)
  - VD: Button , Card , input , header , .....

-modules/module-name/:
  - Chứa các components cấu thành một page hoặc một chức năng cụ thể

- layouts/:
  -Chứa các component layout cho react-router

- api/:
  - setup thư viện gọi API
  - setup các hàm gọi API  
# 1.0.1

- Lỗi: khi render đề bài là đoạn văn bản đài thì nó không auto fix chiều cao để hiển thị hết cái đề. ✅

- Load điều kiện của bài trắc nghiẹm lấy prop cauHoi -> quyết định xem có render phần câu hỏi trong bài không ✅

- Load điều kiện của bài viết lấy prop cauHoi -> nếu có prop cauHoi thì render phần cầu hỏi, nếu không thì render phần tên bài tập làm câu hỏi ✅

- Thêm url firebase vào config nextjs đẻ load image. ✅

# VERSION 1.0.2

- Xem lại khi load một bài tập mới, xử lý load một thông báo / ảnh thông báo đang load ảnh trước khi ảnh chính được load. Vị trí component sửa: UI / ImagePreview ✅

- Xư lý thêm giới hạn số lần đăng nhập sai của user bằng express-rate-limit

Nghi@biab0t91

# VERSION 2.0.0

## TÍnh năng subcriptionUsers

- ~~schema subscriptionUsers~~
- ~~cài package express-useragent để lấy thông tin thiết bị~~

```json
{
  "active": "boolean",
  "username": "tên user",
  "password": "mật khẩu user",
  "email": "email",
  "deviceInfo": {} //Chỉ cho phép 1 thiết bị đăng nhập, muốn thì signout và đăng kí mới
}
```

- methods:
  - ~~signUp~~,
    - ~~api signUp~~
    - ~~build ui form đăng kí~~
    - ~~ráp vào test lên api luôn~~
  - signIn here
    - ~~ui from đăng nhập~~
    - logic khi đăng nhập
      - ~~đầu tiên là xác thực username và password xem có đúng không?~~
      - ~~sau đó xác thực có đúng thiết bị đang gởi request lên app không ? -> khi không phải ta sẽ trả về {token,username} và thông báo tài khoản này đang đăng nhập trên một thiết bị khác.~~
      - ~~Để dùng tiếp vui lòng bấm vào đây để xác thực thoát khỏi tài khoản và đăng nhập lại.~~
      - ~~Build api xóa thiết bị khỏi tài khoản nào~~
      - ~~Ráp vào ui -> sau đó reload lai trang đăng nhập + khi bấm nút đăng xuất khỏi thiết bị cũ thì thêm vào logic xóa mẹ datas ở localStorage đi để xóa thông tin đăng nhập hiện tại luôn.~~
      - **Quan trọng**: phải pass qua được bước password và username để xác minh đúng đó là người dùng hợp lệ rồi mới kiểm tra đến dùng trên 1 thiết bị -> việc này hạn chế người dùng ảo liên tục gởi req không hợp lệ để phá.
      - FIXME:
        - giả sử ta đăng nhập thành công trên web macos
        - sau đó dùng postman logout rồi đăng nhập trên postman
        - lúc này trên web còn lưu thông tin đăng nhập trong localstorage nên nó vẫn duy trì đăng nhập
        - về sau khi đã có api của route /products, lúc này khi gởi request kềm token (token này đã hết xài được) -> xử lý ném lỗi về và trả lại trang login với thông báo "tài khoản của bạn vừa đăng nhập trên một thiết bị khác".
  - changePassword.
    - ~~NGuyên lý: tạo 2 route api: - 1 là forgotPassword: để gởi yêu cầu quên mật khẩu, kiểm tra nếu cung cấp đúng email thì BE sẽ tạo một token dạng encrypted (có thời hạn)-> gởi về mail khách 1 link để đến trang đổi password - 2 là resetPassword: route với logic đổi password mới. - ~~thêm prop resetPasswordToken và resetPasswordTokenExpired, changePassswordAt~~ - Build logic cho api forgotPassword - Đầu tiên phải thiết lập logic và cài đặt để gởi email - Logic tạo token trong link reset email và gởi mail thôi nào. - Build logic cho
    - ~~Thêm trong UI login phần quên password (dùng state chuyển thôi)~~
    - ~~Kick vào thì hiện email input để điền và nút gởi request~~
    - ~~Ráp api và test chạy là xong.~~
    - ~~Sửa lại trong email gởi reset password phải kèm username -> username về sau dùng để tìm user trong db đẻ mà so sánh token.~~
    - ~~FE: build page và UI load giao diện điền password mới tương ứng với url: domain/reset-password?token="..."~~
    - ~~Phụ: build hook localNoti -> áp lại cho các form trước~~
    - ~~Bắt token này kèm vào body gởi yêu cầu đổi pass {token, newPassword}~~
    - ~~BE: bắt token và tìm user~~
    - ~~Logic check và đổi password~~

## Load bài tập về cho subscription user

Mô tả nào:

- Tạo một class SubsctiptionUser gồm: username, token, loadedExercises, failExercises
- Trong prop loadedExercise: dùng logic xáo trộn bài tập như sau:
  - Ví dụ tổng bài load về là: 1, 2.1 , 2.2, 2.3, 3.1, 3.2
  - Đầu tiền là xáo trộn bài tập con trong bài tập lớn trước, rồi sau đó xáo trộn thứ tự của bài lớn -> cuối cùng là push vào một mảng để render
  - Ví dụ: 2.3, 2.1, 2.2, 1, 3.1, 3.2
  - Tức là đảm bảo thứ tự bài tập con phải luôn trong một nhóm gần nhau.
- failExercises: chỉ lưu id của bài tập lớn mà học sinh làm sai -> dùng để load cho mục ôn tập những bài làm sai
- Trong model subscription user, thêm prop points: tính điềm thành tích để xếp hạng (cái tính năng xếp hạng làm sau, có user rồi mới xếp hạng)
- Phần UI tận dụng tối đa của app bài tập học sinh bên mình
- Vẫn tách riêng ra thành một mục subscription user, không dính líu gì cái cũ để tránh xung đột

**DO IT**

- ~~Fe: làm route và ui chọn mục lớn trước: "Điền khuyết vần", "Điền khuyết âm đầu", "Đọc hiểu câu", "Đọc hiểu văn bản"~~
- Fe:
  - ~~xử lý dùng slice redux quản lý info đăng nhập nào~~
  - ~~trong slice sẽ có cb logout (logout chỉ là việc xóa token khỏi slice và localStorage thôi, không đụng đến BE)~~
  - ~~Tạo một comp (dùng để bọc comp cần bảo vệ), comp này kiểm tra có token và username không, nếu không có thì gởi api logout và điều hướng về trang /subscription~~
- FE:
  <!-- - **Bổ sung hook useAxiosInstance để đính kèm token trong mỗi requres** -->
  <!-- - Sau đó áp vào logic tải bài tập bên dưới để test -->
- FE:
  - ~~Sau khi bấm nút tải bài tập thì dùng router chuyển sang url là /products/excercises?cate="abc"&child="xyz"~~
  - Route này sẽ là một route trung gian để ta để logic load bài tập về ,xử lý xóa trộn bài tập -> nói chung là xử lý load 1 set bài về để render -> và nó chỉ render một dòng thông báo đang xử lý tải bài tập.
  - Và ta sẽ dùng slice quản lý subscription để quản lý bài tập được load luôn.
    - _Quan trọng: khi ta fetch lấy bài tập về, phần logic chọn bài, xáo bài ta sẽ đẩy lên BE để làm cho FE gọn_
  - **Quan trọng**: logic và cấu trúc bài tập load về sẽ khác bài tập cũ. Nói chung là ta chỉ tận dụng phần UI của load 1 bài tập ở app cũ thôi.
  - Sau khi load xong, chuyển đến route /products/exercises/package -> ~~tại đây ta dùng useSelector lấy data từ redux về redner bài tập.~~
    - Suy nghĩ thêm về 2 phương án sau:
      - ~~Load bài tập về và lưu vào redux~~
      - _Load bài tập về tại route /products/exercises -> tạo class -> truyền xuống comp package và các comp thứ cấp (mình vẫn thích thằng này hơn: vì dùng class trông gọn hơn, và khi load một cục bài tập về và đẩy class thì có thể dùng class Iamge để load sẵn hình cache.)_
  - ~~FE: sửa lại logic chính xác để query, tức là key chính xác cần query~~
  - ~~BE: ưu tiên làm trước đám trên, build api lấy bài tập nào~~
  - ~~xong api lấy bài tập rồi, trở lại FE và ráp vào xem ok không~~
  - đang dừng ở phân loại bài tập để render dạng bài tập tương ứng

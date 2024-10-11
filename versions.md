FIXME: Thằng này deploy trên vercel nhé.

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
  - signIn here - ~~ui from đăng nhập~~ - logic khi đăng nhập - ~~đầu tiên là xác thực username và password xem có đúng không?~~ - ~~sau đó xác thực có đúng thiết bị đang gởi request lên app không ? -> khi không phải ta sẽ trả về {token,username} và thông báo tài khoản này đang đăng nhập trên một thiết bị khác.~~ - ~~Để dùng tiếp vui lòng bấm vào đây để xác thực thoát khỏi tài khoản và đăng nhập lại.~~ - ~~Build api xóa thiết bị khỏi tài khoản nào~~ - ~~Ráp vào ui -> sau đó reload lai trang đăng nhập + khi bấm nút đăng xuất khỏi thiết bị cũ thì thêm vào logic xóa mẹ datas ở localStorage đi để xóa thông tin đăng nhập hiện tại luôn.~~ - **Quan trọng**: phải pass qua được bước password và username để xác minh đúng đó là người dùng hợp lệ rồi mới kiểm tra đến dùng trên 1 thiết bị -> việc này hạn chế người dùng ảo liên tục gởi req không hợp lệ để phá.
    ◊ - giả sử ta đăng nhập thành công trên web macos - sau đó dùng postman logout rồi đăng nhập trên postman - lúc này trên web còn lưu thông tin đăng nhập trong localstorage nên nó vẫn duy trì đăng nhập - về sau khi đã có api của route /products, lúc này khi gởi request kềm token (token này đã hết xài được) -> xử lý ném lỗi về và trả lại trang login với thông báo "tài khoản của bạn vừa đăng nhập trên một thiết bị khác".
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
  - Trong từng comp classify từng dạng bài
    - tạo 4 class tương ứng với 4 dạng bài, lấy data render, xử lý load ảnh, xử lý lấy kết quả học sinh và so sánh để trả về kết quả
    - dạng điền khuyết
      - ~~xử lý render~~
      - ~~lấy đáp án~~
      - ~~so sánh đáp án trả kết quả: sửa lại: bài tập trên db phần gợi ý phải có đủ phần không dấu và có dấu đúng~~
      - Ok load bìa, làm bài, check kết quả ok hết rồi -> giờ xử lý: làm xong bài cuối cùng thì logic trong class Subscription như thế nào? ~~Ném màn hình chúc mừng, rồi diều hướng về trang chọn bài.~~
        - ~~Phân mức chúc mừng~~
          - 0-3: Bé hãy cố gắng hơn vào lần sau nhé.
          - 4-6: Bé làm tốt lắm, hãy cố gắng hơn vào lần sau nhé.
          - 7-8: Bé làm rất tốt.
          - 9-10: Bé thật xuất sắc.
        - Thêm logic cập nhật kết quả cho user: gồm thành tích 10 lần làm gần nhất và cập nhật các bài tập sai.
          - ~~Check lại ở slice mảng kết quả bài tập làm sai đã~~
          - ~~Thêm api trên BE~~
          - ~~Ráp vào FE hoàn thành thôi~~
      - Lưu thành tích: 1 thanh ngang gồm các mục: stt, ngày, nội dung mục tiêu, thành tích và trong db chỉ lưu 10 thành tích gần nhất. T
        - ~~Api cập nhật thành tích~~
        - ~~Bổ sung thanh bottom options: đăng xuất, xem thành tích làm bài, củng cố kiến thức~~
        - ~~Build ráp logic đăng xuất vào nút~~
        - ~~Build route / thành tích để xem thành tích 10 lần gần nhất~~
        - ~~Build api lấy thành tích và ráp vào render~~
        - ~~Build api lấy bài tập làm sai ngẫu nhiên để trả về cho làm~~
        - Build route cung-co-kien-thuc, logic load bài FE luôn
          - **Vấn đề**: component Congratulation sẽ bị dùng chung với lúc nộp bài thông thường và nộp bài trong mục củng cố -> dùng router query url có products thì submit lên nọp bài thông thường, có consolidate thì submit lên api xử lý mark lại bài đúng trong mảng bài sai :D
      - Thêm mục: ôn tập các bài chưa đúng. Về logic 1 bài sai cần được làm lại đúng 3 lần thì mới đẩy nó ra.
        - ~~Build api lấy mảng ids submit lên, mỗi id này dò trong wrongExercises, nếu trùng thì tăng lên một số, nếu số này bằng 3 rồi thì bỏ nó ra khỏi wrongExercises~~
        - ~~Ok, ráp vào FE hoàn thiện nào luôn~~
  - Ok, hiện tại mới làm ok dạng điền khuyết
    - ~~Trong chọn bài tạp, phần staticData -> bổ sung đk để query thằng đọc hiểu đoạn~~
    - ~~Việc đầu tiên là vào component dạng điền khuyết -> rút gọn code lại, tách được comp đê tái sử dụng cho các dạng khác~~
    - ~~Tiếp đến là build cho dạng trắc nghiệm - cụ thể là đọc hiểu đoạn~~
    - ~~Logic chấm điểm: sửa lại theo phần trăm vì 1 set bài có thể không đến 10~~
    - ~~sửa lại toàn bộ câu trúc bài tập mã dh1 cho đồng bộ~~
      - 4.DH3.Mũ bảo hiểm - done
      - 1.dh3. Rùa con tìm nhà - done
      - 2.DH3.Tôi là HS lớp một -done
      - 3.DH3. Chợ hoa ngày tết ở HN - done
      - 5.DH3.Khu rừng kì lạ dưới đáy biển - done
      - 6.DH3.TiengDan - done
      - 7.DH3.Bài đọc cho gà trống -dône
      - 8.DH3.Cuốn sách của em - done
      - 9.DH3.Lính cứu hỏa -done
      - 10.DH3.Bác trống trường - done
      - 11.DH3.Chú sóc ngoan - done
      - 12.DH3.Loài chim của biển cả - done
      - 13.DH3.Ruộng bậc thang ở Sapa - done
      - 14.DH3.Những cánh cò - done
      - 15.DH3.Chúa tể rừng xanh -> các bài về sau đã làm rồi. - done
    - ~~Trở lại app học sinh, bổ sung các mục chọn bài cho dh1 và test hét thôi nào~~
    - ~~Vào static bổ sung bài tập mã d1~~
  - **Pass qua dạng viết và matching -> sau này bổ sung**

# VERSION 2.1.0

- Đã xong app cơ bản rồi: giải quyết được cho dạng bài đièn khuyết và trắc nghiệm cho các mã d1, dh1, tv4.van, t4.amdau
- Tiếp đến là clone route /products -> /demo ---> đây sẽ là phiên bản demo cho người dùng dùng thử trước khi mua nè.
- Những thứ cần phải cân nhắc:
  - Tất nhiên là khong cần middleware bảo vệ
  - Ném về cho client một app react với full 1 cục data cho một gói bài tập demo cố định
  - Về mặt giao diện thì sẽ trả về 4 mục chính là bốn dạng bài tập để client chọn -> khi cọn một dạng vẫn load full các mục con -> nhưng: chỉ load 1 bài tập con, các mục còn lại sẽ có kí hiệu bị disabled đi.
- Vậy ta sẽ :
  - Build api demo riêng: trong api này chỉ định luôn số bài tập cố đinh sẽ được trả về khi req
  - ~~Trả về data cố định sau:~~
    - Điền khuyết vần - ao au âu - TV4.van.06
    - Điền khuyết âm đầu - c-k - TV4.amdau.02
    - Đọc hiểu câu - 3.DH3.Chợ hoa ngày tết ở HN - D1.07, D1.08, D1.09
    - Đọc hiêu văn bản - 2.DH3.Tôi là HS lớp một - DH1.06, DH1.07, DH1.08
  - route này vẫn cho render thanh bottom menu bên dưới nhưng khóa hết tính năng: thành tích, củng cố kiến thức, đăng xuất -> thay bằng đăng kí (chỉ trong demo)
  - Thanh bottom phải bổ sung một nút nữa là : "Thông tin" gồm các data:
    - Version
    - Số lượng bài tập của từng mục -> showcase
    - -> vậy là phải có một api lấy thông tin thống kê trả về -> nhớ là phải limit để chống spam

## DO IT

- Copy và sửa lại giao diẹn products -> demo
- ~~Build api riêng cho thằng demo~~
  - thiết lập luôn trên đầu api này thằng limit : mỗi người thử chỉ được gởi tối đa **20 request trong 10 phút**
  - api load bài tập: như mô tả chỉ load một số bài cho từng đề mục. done
  - Tới trang cuối cùng, bỏ logic fetch lưu thành tích đê, chỉ chuyển về trang chọn bài của demo thôi.
- ~~Xử lý trang bắt lỗi giới hạn truy cập khi load bài.~~
- Tính năng xem thông tin app:
  - ~~Giao diện xem thông tin: done~~
    - Phiên bản: phiên bản app
    - Thông tin bài tập: tên mục lớn là dạng tiêu đề, các item con sẽ là một thanh full width với 2 cột: tên - số lượng bài
  - ~~api: 1 api riêng để thống kê, nằm trong route demo để kiểm soát rate-limit luôn - done~~
  - ~~Ráp UI và api lại~~
- ~~Trang liên hệ~~
- ~~Bổ sung icon cho đẹp~~
- ~~App đang dùng chung cho học sinh giao bài về nhà và học sinh mua app -> đầu index load giao diện chọn phiên bản nào.~~

- Làm repsonsive cho phone

  - Làm cho phần product trước
    - ~~AUth form - done~~
    - ~~Bottom menu~~
    - ~~Áp hết icon vào bottom menu nào.~~
    - ~~Cái CardHomeword để render nội dung~~
    - ~~Xử lý cho component Categories~~
      - ~~ItemPicker~~
    - ~~COmp: products load bài tập => comp LoadExercise~~\
    - ~~BỔ sung: trong comp Categories, sau khi chọn xong thằng child cate thì croll xuống nút bấm để tăng trải nhiệm (products and demo)~~
    - ~~Component ClassifyExercise: ĐIèn khueyets và trắc nghiệm: options trắc nghiệm chỉnh breakpoint xíu~~
    - ~~Component CHúc mừng~~
    - ~~COmponent Thành tích~~
  - Sau đó áp dụng về demo
    - ~~Comp thông tin phiên bản~~
    - ~~Sửa lại cái nút back responsive~~
  - ~~Ở products: thanh bottom menu phần đăng xuất nên đổi lại thành setting -> tạo một page setting để bỏ những thứ cần vào như: đăng xuất, xem phiên bản app, liên hệ~~

  ~~Trong setting: thêm dòng tài khoản và ngày hết hạn đối với product~~

  - Trong schema phải thêm một prop hết hạn
  - Lúc đăng nhập phải bổ sung logic check ngày hết hạn của tài khoản subscription
  - PHải thêm một api cho việc kích hoạt tài khoản pro.
  - Quan trọng đây: api protectAuth phải được tích hợp logic kiểm tra tài khoản đã đăng kí chưa -> vì api này là api chính để kiểm tra mỗi request của subscription.

- ~~Rà soát limit cho các api quan trọng.~~
  - ~~Nên tạo một CB để xuất ra limit với các mục tiêu cụ thể: gởi quá nhiều yêu cầu trong một thời gian ngắn, giớ hạn gởi số yêu cầu trong một ngày.~~

~~Đầu tiên là sửa lại api khi user đăng nhập, bổ sung check ngày hết hạn đẻ xem có phải user đó đã mua không~~
~~Nếu user đó chưa mua thì điều hướng họ về trang thông báo là để dùng app thì phải mua, và một nút điều hướng đến bản demo để trải nghiệm~~

- ~~Bổ sung trong api login logic check ngày hết hạn của tk~~

  - ~~Trong response data, bổ sung thêm prop isExpired -> prop này khi xử lý ở FE sẽ điều hướng đến đâu~~
  - ~~Trong axiosInstance chưa kèm prop isExpired~~
  - ~~Đòng thời trong api,signup và signin -> trong token nén luôn thông tin isExpired đã xử lý ở trên -> như vậy khi reques trong tokne sẽ có luông thông tin isExpired này hay không đẻ xử lý bước ở dưới.~~
  - ~~Trong protect middlewawr: decoded ra thông tin isExpired này~~
  - ~~Khi này trong các api của products kiểm kiểm tra thêm một bước là isExpired này, còn trong demo (thì không cần vì tk nào cũng có thể truy cập thằng này.)~~

- ~~trong trang settings của user đã đăng kí, hiển thị thông tin tên user name, ngày hết hạn đăng kí gói tháng.~~

  - ~~trong logic signin, trả về thêm ngày hết hạn gói nữa -> mới set vào slice để mà dùng render được ba.~~

- FIXME: trong apiHocSinh, myOrigins nên chỉ để https để bảo mật token jwt trong req. Ngoài ra hỏi chatGpt để chueyern hướng các http sang https
- ~~bài trắc nghiệm, đặt min width cho options chọn để nó view đẹp hơn khi responsive~~
- ~~trong email gởi reset password -> bổ sung thông báo: link có thời hạn 10 phút~~
- Dọn dẹp code, tối ưu hóa thôi nào
  - ~~API học sinh trước~~ done
  - FE nào: thử các trường hợp lỗi để catch lỗi và render ra ui thông báo cho client thử.
    ~~lỗi khi 2 tài khoản chung 1 email, gởi yêu cầu thay đổi password sẽ bị sại~~
    -> ~~email cũng phải là duy nhất vì nó là email để quản lý thanh toán này nọ của client~~
    -> ~~sửa lại schema, api sign up.~~
  - ~~Xóa console.log không cần thiét nào~~
- ~~Trong giao diện mobile, khi bấm kiểm tra xong thì nút Tiếp theo bị trôi -> scroll đến nó ngay~~
- ~~trong trang login, bổ sung useEffect lấy data đăng nhập từ local để fill vào slice -> để người dùng khi thoát app mà không đăng xuất và muốn trở lại app thì pass qua được bước đăng nhập
  - Tại SubscriptionProtect chính là nơi xử lý chính sẽ điều hướng về đâu
  - Về mặt lý thuyết: ta sẽ lấy token từ localStorage -> gởi một api check token lần nữa -> decode token này ra sẽ được username, isExpired -> kiểm tra 2 thằng này hợp lệ hay không -. hợp lệ thì trả về thông tin xác thực tài khoản -> lấy thông tin này set lại vào auth trong slice~~
- ~~thằng lấy bài tập củng cố lại lỗi gì rồi done~~

- Thêm tính năng refresh token với nguyên lý như sau:

  - Nguyên lý:
    - Route signin: sẽ trả vè cho client 2 token, token và refreshToken. Token dùng cho logic xác thực client là tài khoản loại nào, refreshToken dùng để đính kèm tạo token mới.
    - TOken sẽ có hạn trong 30 phút, refreshToken sẽ có hạn trong 7 ngày
    - Tại route signIn sẽ có một useEffect lây token từ slice redux về ,nếu không có value thì bốc từ localStorage để lấy token fetch lên api kiểm tra. _Ý nghĩa: nếu client đăng nhập rồi và quay lại route /subscription thì đọc được token từ slice và sẽ pass được useEffect này, nhưng nếu người dùng đong browser và mởi lại sau đó thì token trong slice sẽ mất, lúc này cần bốc token từ localStorage ra và gởi fetch để kiểm tra lại và cấp lại token này_.
      🌟🌟🌟- **Trường hợp giả sử:**
      - Giả sử user tháng hợp lệ đã đăng nhập thành công và có thể truy cập mọi trang ở FE
      - Khi user này thoát browser, sau đó trở lại nhưng không truy cập trang /subscription đầu tiên mà họ truy cập thẳng route /subscriptions/archivements
      - **Suy luận**: route archivements này auto gởi 1 fetch để truy cập resource trên api, theo code của mình thì trong req này sẽ có một axiosInstance được tạo bởi useAxiosInstance(token) -> mà tham số token này lại được lấy từ slice về -> và theo logic thì do người dùng vào thẳng route này khi truy cập lại nên token=null -> như vậy sẽ bị lỗi ngay.
      - **NHƯNG:** ở FE, mọi route cần quyền hạn đều được bọc bởi compo SubscriptionProtect -> mà trong comp này có logic nếu đọc token từ slice rỗng sẽ bốc từ local ra và gởi fetch để cấp lại token cho đùng và set lại token cho Slice -> nên nó fix được và app chạy ngon. -> và ta không nên lưu token trong local -> do đó phải lấy token từ cookie
    - Vậy ta sẽ bổ sung logic gởi cả reresh token này tại compo SubscriptionProtect này.
  - Làm thôi nào:(mò cái cookie trước rồi làm thằng này sau)
    - ~~Đầu tiên backup git mấy cái trước đã ngon nghẻ rồi.~~
    - _LƯu ý:_ đối với api signUp: ta không cần gởi về refreshTOken vì cơ bản user này chưa có quyền vào app
    - **Quan trọng đây: refreshToken nên được bảo mật, mà localStorage thì bá tánh ai vào lấy cũng được mà cái jwt thì rất dễ bị decode -> giải pháp: lưu token trong cookies**
    - ~~Trong signIn, thay vì gởi token về, set trong cookie thôi~~
    - ~~Sau đó ở FE, sưa lại useAxiosInstance, nếu không có tham số thì config nó lại thành dạng credentials cho cookie auto đính kèm~~
    - ~~Trong signOut -> clear thằng cookie đi~~
    - ~~Chỉnh logic trong signIn nào - dùng cookies, không dùng token trong slice nữa~~
    - ~~Tìm useAxiosInstance(token) -> sửa lại thành không tham số hết để dùng token đính trong cookie khi req~~
    - ~~Route chọn phiên bản âp, sửa icon lại cho đẹp nào, nhìn chuối quá.~~
    - ~~Class subscription, bỏ token đi, thay bằng isExpired~~

- ~~Test cookie: build một api test thử với postman, sau đó build một /route trên FE nextjs để test với api này để hiểu cơ chế hoạt động của cookie trên be và fe đã rồi mới ứng dụng.~~

  - ~~Test api vơi postman~~
  - ~~Test với 1 comp trên FE~~

- ~~Trong demo/ chính thức -> setting -> payment~~
  - ~~Thêm một mục dưới menu là đăng kí gia hạn~~
    - ~~Khung giá / 1 tháng~~
    - ~~Lời nhắc: nếu chưa đăng kí tài khoản vui lòng click vào đây để đk trước~~
      - ~~Thông tin thanh toán sẽ được gởi về email đã đăng kí tài khoản. Nếu chưa có tk, vui lòng đăng kí tại đây.~~
        - ~~Đổi lại trang login, thêm điều kiện: query trên url nếu có form="signup" thì set thằng state đẻ render ra form signup.~~
    - ~~Đầu tiên là chính sách: có nút ẩn / hiện.~~
    - ~~Thông tin chuyển khoản (tạo qr code luôn cho tiện)~~
    - ~~Nội dung chuyển khoản: email-appbtcotrang~~
    - ~~Sau khi ck thành công, vui lòng nhắn với Nghĩa fb + zalo để kích hoạt tài khoản.~~
    - ~~Thêm điều hướng: demo thì thêm một nút dưới bottomMenu, products thì thêm một mục trong settings~~
- TODO: Ok xong cái token trong cookie rồi, giờ xử lý thêm cái refresh token cũng trả về trong cookie
  - Đầu tiên là lên api signIn, trong logic: trả về thêm một token refresh với hạn 7 ngày,
  - Cũng tỏng api này ta sẽ kiểm tra: token chính đã hết hạn chưa, nếu chưa thì pass cái cấp refreshToken.
  - Nếu token chính hết hạn, kiểm tra refresh token đã hết hạn chưa, nếu hết hạn luôn thì trả về lỗi và bắt login lại, nếu chưa hết hạn thì tạo một cặp tokens mới và gởi về.
  - Cặp thời hạn ta sẽ cho là: 1h và 6d cho token chíng và token refresh.
  - LÀM NÈ:
    - ~~đổi biến môi trường cho 2 thằng thời hạn token~~
    - ~~Lên signIn tạo thêm refresh tôken ,trả về cookies, test trên postman xem ok không đã~~
    - ~~Test trên browser xem nó có trả về 2 tokens không.~~
    - ~~Ok, lấy cặp token từ middleware protection~~
    - ~~Đầu tiên là kiểm tra token chính hết hạn chưa~~
    - ~~Token chính hết hạn -> kiểm tra rToken hết hạn chưua~~
    - ~~rTOken chưa hết hạn -> cấp lại cặp token mới~~
    - ~~rToken hết hạn -> ném về lỗi bắt đăng nhập lại~~.
    - ~~XOng thì giảm thời gian của các biến môi trường lại để test xem nó có work không.~~
  - Mọi fetch tài nguyên ở FE, khi gặp code 403 thì phải clear auth và redirect nó về login
    - ~~Như vậy, các code trả về ở mid protection phải chuyển về 403 trước~~
    - Trở lại FE, vào comp protection để xử lý effect rediret về -> Không phải comp protection ở FE chỉ check lần đầu xem user có token trong cookies còn hợp lệ hay không
    - Muốn check token hết hạn phải check từng cb fetch lấy tài ngueyen, check những component có chạy fetch lấy data
      - ~~Check archivement~~
      - ~~Check load bài tập chính: LoadExcercises của products~~
      - ~~Check load bài củng cố~~
- Check lại các vấn đề nhỏ sau đẻ hoàn thiện 2.1.0, vì cơ bản tính năng ok rồi

  - ~~Thời hạn token chỉnh lại.~~
  - ~~Xóa mọi token hay thông tin đính kèm token trong body request, vì dùng token trong cookie rồi.~~
  - ~~rate limit chỉnh lại cho thằng chính~~
  - ~~check mấy cái TODO, FIXME~~
  - ~~xóa console.log không càn thiết~~
  - ~~Thêm thắt những thứ cần ignore khi lên git~~
  - ~~Tạo một mid trên app.js đẻ ghi log lại vào file, sau này lên xem biết lỗi gì từ client xài mà fix lỗi.~~
  - ~~Áp toàn bộ console.log chỉ chạy cho thằng developer ở FE, lên Production thì không.~~

- ~~Ok chạy build sản phẩm cuối thôi nào.~~

- backup git và deploy thôi nào.

# VERSION 2.1.1

## Nhiệm vụ chính

- 📌 THêm hiệu ứng âm thanh. ✅
- Phần câu hỏi cho font to lên và màu đỏ ✅
- 🛑 Refactore lại code ✅
  - Thằng product / demo bị lặp component code -> không được, 2 thằng phải tách bạch -> vì logic sẽ đá nhau, sửa tầm bậy thì demo sẽ dùng được tính năng của subscrption users ✅
  - Check mấy thằng sau xem tái sử dụng được không giữa demo / product
    - WrongAnswerNoti ✅
    - RightAnswerNoti ✅
  - Refactor cho phần products nào ( 🧲 phải kĩ nha)
    - exercises ✅
    - Consolidate ✅
    - ClassifyExercise✅
    - Classify_TracNghiem✅
    - Classify_DienKhuyet✅
    - Categories ✅
    - archivement✅
    - Congratulation✅
- FIx bug:
  - Demo, phần thành tích bấm tiếp theo không redirect lại trang chọn ✅
  - Phần trắc nghiệm, chọn xong thì scroll xuống nút tiếp theo
    - Vãi trắc nghiệm đọc hiểu đoạn thì ok, đọc hiểu câu sao nó không scrool nhỉ
- 🛑 Viết unit test
  - Tư tưởng: copy và paste code cho chat gpt nó check
  - Viết cho thằng demo trước

# VERSION 2.1.2

## Nhiệm vụ chính

🛑 Thêm video vào dạng bài tập đọc hiểu đoạn

- Cài gói react-youtube ✅
- Test thử trên một comp vớ vẩn nào đã ✅
- Thêm vào model Exercises (cả 2 api hs và admin): props videoYoutubeId✅
- Xử lý trong admin✅

  - Trong component thêm bài tập mới / sửa bài tập / clone to Add: thêm một trường là videoYoutubeId✅
  - Xử lý submit data phải lấy trường mới này nữa✅

- Ok trở về hocSinh nào
  - Load prop videoYoutubeId này vào dạng bài trắc nghiệm -> render nó ra thôi✅
  - Ok rồi nhưng bị ném lỗi vl gì đó. GIờ thử build rồi chạy xem sao, xem có lỗi gì không ✅
  - Load video bị lỗi khi repsonsive khá phức tạp -> cho một cái modal đẻ load video riêng biệt ✅

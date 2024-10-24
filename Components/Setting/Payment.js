import CardHomework from "../UI/CardHomework";
import Link from "next/link";
import Image from "next/image";
import staticData from "../../data/static.json";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { SiZigbee } from "react-icons/si";

export default function Payment() {
  const { isExpired } = useSelector((state) => state.subscriptionAuth);
  const backTo = !isExpired ? "/products" : "/demo";

  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <CardHomework>
      <div className="flex flex-col flex-wrap gap-6 p-4 relative ">
        <Link className="btn-shape-back" href={backTo}>
          Trở lại
        </Link>
        <h1 className="product-title-center">Thanh toán</h1>
        <hr className="!my-0" />
        <h2 className="product-title-left">Gia hạn 1 tháng </h2>
        {/* <p>
          Giá ưu đãi: <del className="italic text-coGray2">50.000 đ</del>{" "}
          <span className="font-bold text-xl text-coGreen mx-2">20.000 đ</span>
        </p> */}
        <p>
          Phí: <span className="font-bold text-xl text-coGreen">50.000 đ</span>{" "}
          {/* <span className="font-bold text-xl text-coGreen mx-2">20.000 đ</span> */}
        </p>

        <p>
          📌 <span className="text-coRed">Lưu ý:</span> Thông tin thanh toán sẽ
          được gởi về <strong>email đã đăng kí tài khoản</strong>. Nếu chưa có
          tài khoản vui lòng{" "}
          <span>
            <Link
              href="/subscription?signUp=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              đăng kí tại đây.
            </Link>
          </span>
        </p>
        <p>
          📌 <span className="text-coRed">Lưu ý:</span> Mỗi tài khoản đăng kí
          thành công chỉ dùng được trên một thiết bị. Để dùng được trên thiết bị
          mới cần đăng xuất trên thiết bị cũ.
        </p>

        <hr className="!my-0" />
        <div className="flex flex-row flex-wrap shrink-0 gap-2">
          <h2 className="product-title-left">Điều khoản đăng kí</h2>
          <button
            className="btn-shape btn-shape-ghost !w-fit !p-0 !px-2 !mx-0"
            type="button"
            onClick={() => {
              setShowPolicy((preState) => !preState);
            }}
          >
            {showPolicy ? "Ẩn" : "Hiện"}
          </button>
        </div>
        <p className="">
          Bao gồm hướng dẫn thanh toán, xác nhận, kích hoạt tài khoản, bảo mật
          thông tin, hoàn tiền khi có lỗi và gia hạn tài khoản.
        </p>
        <div className="p-4 bg-coGray5 rounded-xl">
          {!showPolicy && (
            <p className="text-coGray2">
              Bấm nút hiện bên trên để xem thông tin.
            </p>
          )}
          {showPolicy && (
            <>
              <h2 className="product-title-left">Chính sách thanh toán</h2>
              <ol className="list-decimal pl-4">
                Khi sử dụng ứng dụng học tập của chúng tôi, bạn cần hoàn tất quá
                trình thanh toán để có thể truy cập vào các nội dung và tính
                năng của ứng dụng. Chính sách thanh toán của chúng tôi như sau:
                <li>
                  <strong>Phương thức thanh toán</strong>: Chúng tôi chấp nhận
                  thanh toán qua chuyển khoản ngân hàng. Sau khi hoàn tất việc
                  chuyển tiền, bạn cần gửi thông tin giao dịch để chúng tôi xác
                  nhận.
                </li>
                <li>
                  <strong>Xác nhận thanh toán</strong>: Sau khi nhận được thông
                  tin chuyển khoản từ bạn, chúng tôi sẽ tiến hành xác minh trong
                  vòng 24h. Nếu giao dịch hợp lệ, tài khoản của bạn được kích
                  hoạt và bạn có thể bắt đầu sử dụng ứng dụng.
                </li>
                <li>
                  <strong>Thời gian kích hoạt tài khoản</strong>: Sau khi thanh
                  toán được xác nhận thành công, tài khoản của bạn sẽ được kích
                  hoạt chậm nhất trong 1h. Chúng tôi sẽ gửi thông báo qua email
                  để xác nhận việc kích hoạt.
                </li>
              </ol>
              <hr className="!my-2" />
              <h2 className="product-title-left">Điều khoản thanh toán</h2>
              <ol className="list-decimal pl-4">
                <li>
                  <strong>Tính bảo mật</strong>: Thông tin thanh toán của bạn sẽ
                  được chúng tôi bảo mật. Chúng tôi cam kết không chia sẻ thông
                  tin tài khoản ngân hàng của bạn với bên thứ ba mà không có sự
                  đồng ý của bạn, trừ khi có yêu cầu của pháp luật.
                </li>
                <li>
                  <strong>Chính sách hoàn tiền</strong>: Trong trường hợp bạn
                  gặp sự cố với tài khoản sau khi đã thanh toán, vui lòng liên
                  hệ với chúng tôi. Chúng tôi sẽ tiến hành kiểm tra và xác minh
                  các vấn đề liên quan.
                  <ul>
                    <li>
                      Chúng tôi chỉ hoàn tiền trong các trường hợp thanh toán
                      không thành công nhưng tài khoản vẫn bị trừ tiền hoặc
                      không thể kích hoạt tài khoản sau khi xác nhận thanh toán.
                    </li>
                    <li>
                      {" "}
                      Khi tài khoản đã kích hoạt thành công, chúng tôi không hỗ
                      trợ hoàn tiền hay chuyển đổi dưới bất kì hình thức, lý do
                      nào.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Chính sách gia hạn</strong>: Tài khoản của bạn sẽ được
                  kích hoạt theo thời hạn đã đăng ký. Khi hết hạn, bạn cần thực
                  hiện lại thanh toán để tiếp tục sử dụng ứng dụng. Nếu không
                  gia hạn trong thời gian quy định, tài khoản sẽ bị tạm khóa cho
                  đến khi có giao dịch mới.
                </li>
                <li>
                  <strong>Trách nhiệm của người dùng</strong>: Người dùng cần
                  đảm bảo rằng thông tin thanh toán được cung cấp là chính xác.
                  Chúng tôi không chịu trách nhiệm nếu việc cung cấp thông tin
                  không chính xác dẫn đến chậm trễ trong việc kích hoạt tài
                  khoản.
                </li>
              </ol>
            </>
          )}
        </div>

        <hr className="!my-0" />
        <h2 className="product-title-left">Thông tin chuyển khoản </h2>
        <div className="flex flex-row flex-wrap shrink-0 gap-2">
          <ul className="w-1/2 flex flex-col gap-2 p-3 rounded-xl bg-coBlue3">
            <li>
              <span className="text-coGray2 italic mr-2">Tên TK:</span> TRẦN CHÍ
              NGHĨA
            </li>
            <li>
              {" "}
              <span className="text-coGray2 italic mr-2">Số TK:</span> 1028 7899
              5520
            </li>
            <li>
              {" "}
              <span className="text-coGray2 italic mr-2">
                Nội dung chuyển khoản:
              </span>{" "}
              <span className="text-coRed">email-appbtcotrang</span>
            </li>
            <li>
              {" "}
              <span className="text-coGray2 italic mr-2">Ví dụ:</span>{" "}
              <span>abc@mail.com-appbtcotrang</span>
            </li>
          </ul>
          <div
            className="relative mx-auto
             w-[200px] sm:w-[250px] 2xl:w-[300px] 
        h-[200px] sm:max-2xl:h-[300px] 2xl:h-[400px] "
          >
            <Image
              src="/assets/qrcode.webp"
              alt="Thông tin chuyển khoản"
              fill={true}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                placeholder: "blur", // Sử dụng placeholder blur của next/image
                blurDataURL: "/assets/404.png", // Đường dẫn đến ảnh placeholder nhỏ
              }}
            />
          </div>
        </div>

        <hr className="!my-0" />
        <h2 className="product-title-left">Xác nhận thanh toán </h2>
        <p>
          Sau khi chuyển khoản thành công, chúng tôi sẽ kiểm tra và kích hoạt
          tài khoản sớm nhất có thể. <br />
          Thông tin kích hoạt sẽ được gởi về email của anh / chị.
          <br />
          Để được hỗ trợ nhanh hơn, anh chị có thể chụp hình chuyển khoản thành
          công và liên hệ với chúng tôi bằng facebook/zalo bên dưới.
        </p>
        <Link
          href={staticData.CONTACT_SUPPORT_FACEBOOK}
          className="btn-shape btn-shape-try no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="mx-4" /> Facebook
        </Link>
        <Link
          href={staticData.CONTACT_SUPPORT_ZALO}
          target="_blank"
          className="btn-shape btn-shape-try no-underline"
          rel="noopener noreferrer"
        >
          <SiZigbee className="mx-4" /> Zalo
        </Link>
      </div>
    </CardHomework>
  );
}

import CardHomework from "../UI/CardHomework";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useAxiosInstance } from "../../hooks/useHooks";
import {
  FaSignOutAlt,
  FaBookmark,
  FaFacebookMessenger,
  FaMoneyBill,
} from "react-icons/fa";
import Link from "next/link";
import { formatDateView } from "../../helper/uti";
import { subscriptionSignOut } from "../../helper/axiosApi";

export default function Settings() {
  const dispatch = useDispatch();
  const router = useRouter();
  const axiosInstance = useAxiosInstance();

  const signOutHandler = async () => {
    await subscriptionSignOut({
      axiosInstance,
      dispatch,
      router,
      SubscriptionAuthActions,
    });
  };
  const { username, expirySubscriptionTime, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const goBack = () => {
    if (!isExpired) {
      router.replace("/products");
    } else {
      router.replace("/demo");
    }
  };

  return (
    <CardHomework>
      <div className="relative p-10">
        <button className="btn-shape btn-shape-back" onClick={goBack}>
          Trở lại
        </button>
        <h1 className="uppercase font-bold text-2xl my-4">Cài đặt</h1>
        <ul className="setting-list">
          <li className="setting-control">
            <label className="product-title-left">Tài khoản: </label>
            <p className="font-bold text-xl text-coGreen">{username}</p>
          </li>
          <li className="setting-control">
            <label className="product-title-left">
              Ngày gia hạn tiếp theo:{" "}
            </label>
            <p className="text-xl text-coGreen">
              {formatDateView(expirySubscriptionTime)}
            </p>
          </li>
          <li className="setting-control">
            <label className="product-title-left">Thoát khỏi ứng dụng</label>
            <button
              className="btn-shape btn-shape-main w-fit !mx-0 !p-2"
              type="button"
              onClick={signOutHandler}
            >
              <FaSignOutAlt size={30} />
              <p>Đăng xuất</p>
            </button>
          </li>
          <li className="setting-control">
            <label className="product-title-left">Mô tả thông tin app</label>
            <Link
              className="btn-shape btn-shape-main w-fit !mx-0 !p-2 no-underline"
              href="/about"
            >
              <FaBookmark size={30} /> Thông tin
            </Link>
          </li>
          <li className="setting-control">
            <label className="product-title-left">Liên hệ cô Trang</label>
            <Link
              className="btn-shape btn-shape-main w-fit !mx-0 !p-2 no-underline"
              href="/contact"
            >
              <FaFacebookMessenger size={30} /> Liên hệ
            </Link>
          </li>
          <li className="setting-control">
            <label className="product-title-left">Thanh toán</label>
            <Link
              className="btn-shape btn-shape-main w-fit !mx-0 !p-2 no-underline"
              href="/payment"
            >
              <FaMoneyBill size={30} /> Thanh toán
            </Link>
          </li>
        </ul>
      </div>
    </CardHomework>
  );
}

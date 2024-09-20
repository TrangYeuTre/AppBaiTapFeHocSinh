import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import CardHomework from "../../Components/UI/CardHomework";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { subscriptionSignOut } from "../../helper/axiosApi";
import { useAxiosInstance } from "../../hooks/useHooks";

export default function Wellcome() {
  const router = useRouter();
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();

  // const { isExpired } = useSelector((state) => state.subscriptionAuth);

  const goToTryApp = async () => {
    await fetchSignOut();
    router.replace("/demo");
  };
  const goToPayment = async () => {
    await fetchSignOut();
    router.replace("/payment");
  };
  const goToSignIn = async () => {
    await fetchSignOut();
    router.replace("/subscription");
  };

  const fetchSignOut = async () => {
    await subscriptionSignOut({
      axiosInstance,
      dispatch,
      router,
      SubscriptionAuthActions,
    });
  };

  // if (isExpired)
  return (
    <CardHomework>
      <div className="flex flex-col gap-4 p-6 *:text-xl">
        <h1 className="text-center uppercase text-coGreen font-bold">
          Xin chào
        </h1>
        <hr />
        <p>
          📌 Tài khoản của bạn chưa đăng kí hoặc đã hết hạn gói đăng kí tháng.{" "}
        </p>
        <hr />
        <p>
          👉 Nếu muốn đăng kí sử dụng app, vui lòng đăng kí
          <span
            onClick={goToPayment}
            className="text-coPink uppercase mx-2 underline cursor-pointer hover:opacity-80"
          >
            tại đây.
          </span>
        </p>
        <p>
          👉 Nếu muốn dùng thử app trước khi đăng kí mua, bạn có thể thử app{" "}
          <span
            onClick={goToTryApp}
            className="text-coPink uppercase mx-2 underline cursor-pointer hover:opacity-80"
          >
            tại đây
          </span>
          .
        </p>

        <p>
          👉 Nếu đã đăng kí mua, vui lòng trở lại trang đăng nhập
          <span
            onClick={goToSignIn}
            className="text-coPink uppercase mx-2 underline cursor-pointer hover:opacity-80"
          >
            tại đây.
          </span>
        </p>
      </div>
    </CardHomework>
  );
  // return null;
}

import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import CardHomework from "../../Components/UI/CardHomework";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Wellcome() {
  const router = useRouter();
  const { token, isExpired } = useSelector((state) => state.subscriptionAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) router.replace("/subscription");
  }, [token]);

  const goToTryApp = () => {
    clearAuth();
    router.replace("/demo");
  };
  const goToContact = () => {
    clearAuth();
    router.replace("/contact");
  };
  const goToSignIn = () => {
    clearAuth();
    router.replace("/subscription");
  };

  //Bất kì CB nào đều phải gọi cb này để clear auth đi
  const clearAuth = () => dispatch(SubscriptionAuthActions.clearAuth());

  if (token && isExpired)
    return (
      <CardHomework>
        <div className="flex flex-col gap-4 p-6 *:text-xl">
          <h1 className="text-center uppercase text-coGreen font-bold">
            Xin chào
          </h1>
          <hr />
          <p>
            Tài khoản của bạn chưa đăng kí hoặc đã hết hạn gói đăng kí tháng.{" "}
          </p>
          <p>
            Nếu muốn dùng thử app trước khi đăng kí mua, bạn có thể thử app{" "}
            <span
              onClick={goToTryApp}
              className="text-coPink uppercase mx-2 underline cursor-pointer hover:opacity-80"
            >
              tại đây
            </span>
            .
          </p>
          <p>
            Nếu muốn đăng kí sử dụng app, vui lòng liên hệ với cô Trang
            <span
              onClick={goToContact}
              className="text-coPink uppercase mx-2 underline cursor-pointer hover:opacity-80"
            >
              tại đây.
            </span>
          </p>
          <p>
            Nếu đã đăng kí mua, vui lòng trở lại trang đăng nhập
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
  return null;
}

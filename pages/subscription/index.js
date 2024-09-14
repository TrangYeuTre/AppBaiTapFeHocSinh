import SubscriptionAuth from "../../Components/auth/SubscriptionAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useMainternance } from "../../hooks/useHooks";
import { getInfosUserAldreadyLoggedIn } from "../../helper/axiosApi";
import { useAxiosInstance } from "../../hooks/useHooks";

//Mô tả xíu
//Đầu tiên là lấy token từ slice:
// -Trường hợp không có token này, moi từ local -> lấy token local fetch lên api check và setAuth lại từ kết quả trả về
// - Trường hợp có token từ slice, vào đến comp thành phần SUbscriptionAuth có useEffect xử lý pass qua login
export default function SubscriptionRoute() {
  useMainternance();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.subscriptionAuth.token);

  //SIde effect nếu không có token từ slice, moi từ local ra fetch lên api check token local
  useEffect(() => {
    const doFetch = async () => {
      const tokenFromLocal = localStorage.getItem("token");
      if (!tokenFromLocal) {
        return;
      }
      const axiosInstance = useAxiosInstance(tokenFromLocal);

      const {
        username,
        token: checkedToken,
        isExpired,
        expirySubscriptionTime,
      } = await getInfosUserAldreadyLoggedIn(axiosInstance);
      if (checkedToken) {
        dispatch(
          SubscriptionAuthActions.setAuth({
            username,
            token: checkedToken,
            isExpired,
            expirySubscriptionTime,
          })
        );
      } else {
        dispatch(SubscriptionAuthActions.clearAuth());
      }
    };
    if (!token) doFetch();
  }, [token]);

  return !token ? <SubscriptionAuth /> : null;
}

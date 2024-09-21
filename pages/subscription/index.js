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
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();
  const { isExpired, username } = useSelector(
    (state) => state.subscriptionAuth
  );

  //SIde effect nếu không có token từ slice, moi từ local ra fetch lên api check token local
  useEffect(() => {
    const doFetch = async () => {
      const {
        username: checkedUsername,
        isExpired: checkedIsExpired,
        expirySubscriptionTime,
      } = await getInfosUserAldreadyLoggedIn(axiosInstance);

      if (!checkedIsExpired) {
        dispatch(
          SubscriptionAuthActions.setAuth({
            username: checkedUsername,
            isExpired: checkedIsExpired,
            expirySubscriptionTime,
          })
        );
        router.replace("/products");
      } else {
        dispatch(SubscriptionAuthActions.clearAuth());
      }
    };
    if (isExpired && !username) doFetch();
  }, []);

  return isExpired ? <SubscriptionAuth /> : null;
}

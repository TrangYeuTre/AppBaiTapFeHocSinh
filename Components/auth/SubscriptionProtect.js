import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../hooks/useHooks";
import { getInfosUserAldreadyLoggedIn } from "../../helper/axiosApi";
import CardHomework from "../../Components/UI/CardHomework";
import DenyAccess from "./DenyAccess";

export default function SubscriptionProtect({ children }) {
  const { token, username, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const tokenFromLocal = localStorage.getItem("token");
      if (!tokenFromLocal) {
        // return router.replace("/subscription");
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

  useEffect(() => {
    if (token) {
      if (!isExpired) {
        setValidUser(true);
      } else {
        setValidUser(false);
        router.replace("/auth/wellcome");
      }
    }
  }, [token, username, isExpired]);

  return validUser ? children : <DenyAccess />;
}

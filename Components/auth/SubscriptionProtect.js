import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../hooks/useHooks";
import { getInfosUserAldreadyLoggedIn } from "../../helper/axiosApi";
import Wellcome from "./Wellcome";

export default function SubscriptionProtect({ children }) {
  const { isExpired } = useSelector((state) => state.subscriptionAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const doFetch = async () => {
      const axiosInstance = useAxiosInstance();
      const { username, isExpired, expirySubscriptionTime } =
        await getInfosUserAldreadyLoggedIn(axiosInstance);

      if (!isExpired) {
        dispatch(
          SubscriptionAuthActions.setAuth({
            username,
            isExpired,
            expirySubscriptionTime,
          })
        );
      } else {
        dispatch(SubscriptionAuthActions.clearAuth());
      }
    };
    if (isExpired) doFetch();
  }, []);

  return !isExpired ? children : <Wellcome />;
}

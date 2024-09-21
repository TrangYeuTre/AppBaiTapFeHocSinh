import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../hooks/useHooks";
import { getInfosUserAldreadyLoggedIn } from "../../helper/axiosApi";
import { devErrorMessage } from "../../helper/uti";
import Wellcome from "./Wellcome";

export default function SubscriptionProtect({ children }) {
  const { isExpired } = useSelector((state) => state.subscriptionAuth);
  const [message, setMessage] = useState("");
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const { username, isExpired, expirySubscriptionTime, message } =
          await getInfosUserAldreadyLoggedIn({
            axiosInstance,
          });

        if (!isExpired) {
          dispatch(
            SubscriptionAuthActions.setAuth({
              username,
              isExpired,
              expirySubscriptionTime,
            })
          );
        } else {
          setMessage(message);
          dispatch(SubscriptionAuthActions.clearAuth());
        }
      } catch (err) {
        devErrorMessage({
          err,
          from: "Components/auth/SubscriptionProtect.js",
        });
      } finally {
      }
    };
    if (isExpired) doFetch();
  }, []);

  return !isExpired ? children : <Wellcome message={message} />;
}

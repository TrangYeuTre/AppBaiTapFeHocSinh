import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";

export default function SubscriptionProtect({ children }) {
  const { token, username } = useSelector((state) => state.subscriptionAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    if (token && username) {
      setValidUser(true);
    } else {
      setValidUser(false);
      dispatch(SubscriptionAuthActions.clearAuth());
      router.replace("/subscription");
    }
  }, [token, username]);

  return validUser ? children : null;
}

import SubscriptionAuth from "../../Components/auth/SubscriptionAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMainternance } from "../../hooks/useHooks";

export default function SubscriptionRoute() {
  useMainternance();
  const router = useRouter();

  const token = useSelector((state) => state.subscriptionAuth.token);

  useEffect(() => {
    // if (token) router.push("/exercises");
    if (token) router.push("/products");
  }, [token]);

  return <SubscriptionAuth />;
}

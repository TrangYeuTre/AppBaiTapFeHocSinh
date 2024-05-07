import SignIn from "../../Components/auth/SignIn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMainternance } from "../../hooks/useHooks";

export default function SignInRoute() {
  useMainternance();
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // if (token) router.push("/exercises");
    if (token) router.push("/homeworks");
  }, [token]);

  return <SignIn />;
}

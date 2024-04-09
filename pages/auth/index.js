import SignIn from "../../Components/auth/SignIn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SignInRoute() {
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);
  console.log(token)

  useEffect(() => {
    if (token) router.push("/exercises");
  }, [token]);

  return <SignIn />;
}

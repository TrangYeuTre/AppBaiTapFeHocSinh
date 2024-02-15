import SignIn from "../../Components/auth/SignIn";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/authContext";

export default function SignInRoute() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const router = useRouter();

  useEffect(() => {
    if (token) router.push("/exercises");
  }, [token]);

  return <SignIn />;
}

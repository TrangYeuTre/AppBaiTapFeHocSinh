import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/authContext";

export default function useProtect() {
  const authCtx = useContext(AuthContext);
  const { token, email } = authCtx.auth;
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/auth");
  }, [token]);

  return email;
}

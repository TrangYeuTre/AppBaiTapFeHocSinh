import Loading from "../Components/UI/Loading";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/authContext";

export default function App({ children }) {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth");
  }, []);

  return <Loading />;
}

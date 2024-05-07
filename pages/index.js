import Loading from "../Components/UI/Loading";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ children }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, []);

  return <Loading />;
}

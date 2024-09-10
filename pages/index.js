import Loading from "../Components/UI/Loading";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InitChooseApp from "../Components/auth/ChooseApp";

export default function App({ children }) {
  return <InitChooseApp />;
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/auth");
  // }, []);

  // return <Loading />;
}

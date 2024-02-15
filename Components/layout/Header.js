import Image from "next/image";
import Button from "../UI/Button";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";
import { useRouter } from "next/router";

export default function Header() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const signOutHandler = () => {
    authCtx.setAuth({
      token: "",
      email: "",
    });
    router.push("/auth");
  };

  return (
    <header className="flex flex-1 flex-row items-center justify-between p-4 border-b-2 border-coGray2">
      <div>
        <Image src="/assets/logo.png" alt="Logo web" width={60} height={60} />
      </div>
      <nav>
        {authCtx.auth.token && <Button onAction={signOutHandler}>Thoát</Button>}
      </nav>
    </header>
  );
}

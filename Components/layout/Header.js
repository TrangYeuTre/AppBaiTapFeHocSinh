import Image from "next/image";
import Button from "../UI/Button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);

  const signOutHandler = () => {
    dispatch(AuthActions.clearAuth());
    router.push("/auth");
  };

  return (
    <header
      className="flex flex-1 flex-row items-center
     justify-between p-2 border-b-2 border-coGray4"
    >
      <div>
        <Image src="/assets/logo.png" alt="Logo web" width={60} height={60} />
      </div>
      <nav>{token && <Button onAction={signOutHandler}>Thoát</Button>}</nav>
    </header>
  );
}

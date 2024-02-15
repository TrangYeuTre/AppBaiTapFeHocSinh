import Card from "../UI/Card";
import Button from "../UI/Button";
import { signIn } from "../../helper/Firebase";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../store/authContext";
import { useRouter } from "next/router";

export default function SignIn() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async () => {
    const dataSubmit = {
      email: emailRef.current.value || "",
      password: passwordRef.current.value || "",
    };
    if (!dataSubmit.email || !dataSubmit.password) return;
    await signIn({
      email: dataSubmit.email,
      password: dataSubmit.password,
      authCtx,
      router,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      authCtx.setAuth({ token, email });
      router.replace("/exercises");
    }
  }, []);

  return (
    <Card plusStyle="w-1/3 flex flex-col gap-4 mt-12 py-4 bg-coBlue3">
      <h2 className="border-b-2 border-coGray2">Đăng nhập</h2>
      <label htmlFor="email">Email</label>
      <input
        ref={emailRef}
        id="email"
        type="email"
        placeholder="Điền email ..."
        required
        // className="border-coBlue4 b"
      />
      <div className="flex flex-row items-center shrink-0 gap-2">
        <label htmlFor="Password">Password</label>
        <p
          className="text-base italic text-coPink cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? "Ẩn" : "Hiện"}
        </p>
      </div>
      <input
        ref={passwordRef}
        id="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Điền Password ..."
        required
        minLength={3}
      />
      <Button onAction={loginHandler}>Đăng nhập</Button>
    </Card>
  );
}

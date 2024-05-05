import Card from "../UI/Card";
import Button from "../UI/Button";
import { signIn } from "../../helper/axiosApi";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/authSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginHandler = async () => {
    const dataSubmit = {
      username: usernameRef.current.value || "",
      password: passwordRef.current.value || "",
    };
    if (!dataSubmit.username || !dataSubmit.password) return;
    await signIn({
      username: dataSubmit.username,
      password: dataSubmit.password,
      dispatch,
      AuthActions,
      router,
      setError,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const hocSinh = localStorage.getItem("hocSinh");
    if (token && username) {
      dispatch(AuthActions.setAuth({ token, username, hocSinh }));
      // router.replace("/exercises");
      router.replace("/homeworks");
    }
  }, []);

  return (
    <section className="content-wrapper">
      <Card plusStyle="login-card">
        <h2 className="border-b-2 border-coGray2">Đăng nhập</h2>
        <label htmlFor="username">Username</label>
        <input
          ref={usernameRef}
          id="username"
          type="username"
          placeholder="Điền username ..."
          required
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
        {error && <p className="text-base text-coRed">{error}</p>}
        <Button onAction={loginHandler}>Đăng nhập</Button>
      </Card>
    </section>
  );
}

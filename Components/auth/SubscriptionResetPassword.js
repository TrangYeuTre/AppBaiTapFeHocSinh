import Card from "../UI/Card";
import Button from "../UI/Button";
import { resetPassword } from "../../helper/axiosApi";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// import { AuthActions } from "../../store/authSlice";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useLocalNotification } from "../../hooks/useHooks";
import LocalNotification from "../UI/LocalNotification";

export default function SubscriptionResetPassword({ token, username }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const passwordRef = useRef();

  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const [showPassword, setShowPassword] = useState(false);
  const [backToLogin, setBackToLogin] = useState(false);

  const resetPasswordHandler = async () => {
    const dataSubmit = {
      password: passwordRef.current.value || "",
      token,
      username,
    };
    if (!dataSubmit.username || !dataSubmit.password || !dataSubmit.token)
      return;
    const result = await resetPassword({
      username: dataSubmit.username,
      password: dataSubmit.password,
      token: dataSubmit.token,
      doSetLocalNotification,
    });
    if (result === "success") setBackToLogin(true);
  };

  const backToLoginHandler = () => router.replace(`/subscription`);

  return (
    <section className="content-wrapper">
      <Card plusStyle="login-card">
        <h2 className="border-b-2 border-coGray2">Thay đổi mật khẩu</h2>
        <div className="flex flex-row items-center shrink-0 gap-2">
          <label htmlFor="Password">Mật khẩu mới: </label>
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
          placeholder="Nhập mật khẩu mới..."
          required
          minLength={3}
        />
        {/* {error && <p className="text-base text-coRed">{error}</p>} */}
        <LocalNotification localNoti={localNoti} />
        <Button onAction={resetPasswordHandler}>Gởi yêu cầu</Button>
        {backToLogin && (
          <p className="form-sub-action" onClick={backToLoginHandler}>
            👉 Trở lại đăng nhập
          </p>
        )}
      </Card>
    </section>
  );
}

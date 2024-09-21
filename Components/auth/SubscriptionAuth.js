import Card from "../UI/Card";
import Button from "../UI/Button";
import {
  subscriptionSignup,
  subscriptionSignin,
  removeDiviceInfos,
  forgotPassword,
} from "../../helper/axiosApi";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useLocalNotification } from "../../hooks/useHooks";
import LocalNotification from "../UI/LocalNotification";

export default function SubscriptionAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const signupUsernameRef = useRef();
  const signupEmailRef = useRef();
  const signupPasswordRef = useRef();

  const forgotPasswordEmailRef = useRef();

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInDevice, setLoggedInDevice] = useState(false);

  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();
  const [localFetching, setLocalFetching] = useState(false);

  const signupHandler = async () => {
    const dataSubmit = {
      username: signupUsernameRef.current.value || "",
      password: signupPasswordRef.current.value || "",
      email: signupEmailRef.current.value || "",
    };
    if (!dataSubmit.username || !dataSubmit.password || !dataSubmit.email)
      return;
    await subscriptionSignup({
      username: dataSubmit.username,
      password: dataSubmit.password,
      email: dataSubmit.email,
      dispatch,
      SubscriptionAuthActions,
      router,
      doSetLocalNotification,
      clearLocalNotification,
    });
  };

  const loginHandler = async () => {
    const dataSubmit = {
      username: usernameRef.current.value || "",
      password: passwordRef.current.value || "",
    };
    if (!dataSubmit.username || !dataSubmit.password) return;
    await subscriptionSignin({
      username: dataSubmit.username,
      password: dataSubmit.password,
      dispatch,
      SubscriptionAuthActions,
      router,
      setLoggedInDevice,
      doSetLocalNotification,
      clearLocalNotification,
    });
  };

  const removeDivice = async () => {
    const dataSubmit = {
      username: usernameRef.current.value || "",
      password: passwordRef.current.value || "",
    };
    if (!dataSubmit.username || !dataSubmit.password) return;
    await removeDiviceInfos({
      username: dataSubmit.username,
      password: dataSubmit.password,
      dispatch,
      SubscriptionAuthActions,
      router,
      doSetLocalNotification,
      clearLocalNotification,
    });
  };

  const forgotPasswordHandler = async () => {
    const dataSubmit = {
      email: forgotPasswordEmailRef.current.value || "",
    };
    if (!dataSubmit.email) return;
    setLocalFetching(true);
    await forgotPassword({
      email: dataSubmit.email,
      doSetLocalNotification,
      clearLocalNotification,
    });
    setLocalFetching(false);
  };

  const switchForm = (order) => {
    clearLocalNotification();
    if (order === "login") {
      setShowLoginForm(true);
      setShowForgotPassword(false);
    }
    if (order === "signUp") {
      setShowLoginForm(false);
      setShowForgotPassword(false);
    }
    if (order === "forgotPassword") {
      setShowLoginForm(false);
      setShowForgotPassword(true);
    }
  };

  //Effect render trang signup nếu có param trên url
  useEffect(() => {
    const { query } = router;
    if (query.signUp) switchForm("signUp");
  }, [router]);

  return (
    <section className="content-wrapper">
      {!showForgotPassword && showLoginForm && (
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
          {/* {error && <p className="text-base text-coRed">{error}</p>} */}
          <LocalNotification localNoti={localNoti} />
          {loggedInDevice && (
            <p className="text-base text-coBlue2">
              Hướng dẫn: <br />
              - Điền đúng thông tin username và password phía trên <br />- Sau
              đó bấm nút <strong>Đăng xuất khỏi thiết bị cũ</strong> bên dưới.{" "}
              <br />- Trang web sẽ được tải lại. Sau đó tiến hành đăng nhập như
              bình thường là được.
            </p>
          )}
          <Button onAction={!loggedInDevice ? loginHandler : removeDivice}>
            {!loggedInDevice ? "Đăng nhập" : "Đăng xuất khỏi thiết bị cũ"}
          </Button>
          {!loggedInDevice && (
            <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
              <p
                className="form-sub-action"
                onClick={switchForm.bind(this, "signUp")}
              >
                👉 Đăng kí tài khoản mới
              </p>
              <p
                className="form-sub-action"
                onClick={switchForm.bind(this, "forgotPassword")}
              >
                👉 Quên mật khẩu
              </p>
            </div>
          )}
        </Card>
      )}
      {!showForgotPassword && !showLoginForm && (
        <Card plusStyle="login-card">
          <h2 className="border-b-2 border-coGray2">Đăng kí tài khoản</h2>
          <label htmlFor="username-signup">Username</label>
          <input
            ref={signupUsernameRef}
            id="username-signup"
            type="username"
            placeholder="Điền username ..."
            required
          />
          <label htmlFor="email-signup">Email (nhận thông tin đăng kí)</label>
          <input
            ref={signupEmailRef}
            id="email-signup"
            type="email"
            placeholder="Điền email ..."
            required
          />
          <div className="flex flex-row items-center shrink-0 gap-2">
            <label htmlFor="Password-signup">Password</label>
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
            ref={signupPasswordRef}
            id="Password-signup"
            type={showPassword ? "text" : "password"}
            placeholder="Điền Password ..."
            required
            minLength={3}
          />

          {/* {error && <p className="text-base text-coRed">{error}</p>} */}
          <LocalNotification localNoti={localNoti} />
          <Button onAction={signupHandler}>Đăng kí</Button>
          <p
            className="form-sub-action"
            onClick={switchForm.bind(this, "login")}
          >
            👉 Trở lại đăng nhập
          </p>
        </Card>
      )}
      {!showLoginForm && showForgotPassword && (
        <Card plusStyle="login-card">
          <h2 className="border-b-2 border-coGray2">
            Yêu cầu đặt lại mật khẩu
          </h2>
          <label htmlFor="forgot-password-email">Email</label>
          <input
            ref={forgotPasswordEmailRef}
            id="forgot-password-email"
            placeholder="Điền email để nhận link lấy lại mật khẩu."
            required
          />
          <LocalNotification localNoti={localNoti} />
          <Button onAction={forgotPasswordHandler}>
            {localFetching ? "Đang xử lý..." : "Gởi yêu cầu"}
          </Button>
          <p
            className="form-sub-action"
            onClick={switchForm.bind(this, "login")}
          >
            👉 Trở lại đăng nhập
          </p>
        </Card>
      )}
    </section>
  );
}

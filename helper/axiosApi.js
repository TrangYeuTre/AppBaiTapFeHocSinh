import axios from "axios";
import { devErrorMessage } from "./uti";
import staticData from "../data/static.json";

const enviroment = process.env.NODE_ENV;
const API_HOCSINH =
  enviroment === "development"
    ? staticData.API_HOCSINH_DEV
    : staticData.API_HOCSINH;

export const signIn = async ({
  username,
  password,
  dispatch,
  AuthActions,
  router,
  setError,
}) => {
  const fetchUrl = API_HOCSINH + "/auth/signIn";
  try {
    const response = await axios.post(fetchUrl, {
      username,
      password,
    });
    if (response.data) {
      dispatch(
        AuthActions.setAuth({
          token: response.data.data.data.token,
          username: response.data.data.data.username,
          hocSinh: response.data.data.data.hocSinh,
        })
      );
      if (router) router.push("/homeworks");
    } else {
      dispatch(AuthActions.clearAuth());
    }
    setError("");
  } catch (err) {
    if (err && err.response) {
      devErrorMessage({
        err,
        from: "helper/axiosApi.js",
      });
      setError(
        err.response.status === 429
          ? err.response.data
          : "Thông tin đăng nhập không đúng."
      );
    }
  }
};

//Lấy toan bộ bài tập về nhà của học sinh (trong thời hạn)
export const getAvailableHomeworks1Student = async ({
  id,
  axiosInstance,
  router,
}) => {
  const fetchUrl = API_HOCSINH + "/homeworks/" + id;
  try {
    const response = await axiosInstance.get(fetchUrl);
    return response.data.data || [];
  } catch (err) {
    devErrorMessage({
      err,
      from: "helper/axiosApi.js",
    });
    return [];
  }
};

//Nộp bài tập
export const submitAnswers = async ({ hws, axiosInstance, hocSinh }) => {
  const fetchUrl = API_HOCSINH + "/homeworks/" + hocSinh;
  const updatedDatas = convertHwsToUpdateDatas(hws);
  try {
    const response = await axiosInstance.put(fetchUrl, updatedDatas);
    return response.status;
  } catch (err) {
    devErrorMessage({
      err,
      from: "helper/axiosApi.js",
    });
    return 500;
  }
};

//CB chuyển hóa hws thành mảng items dùng cho nôp bài thôi
const convertHwsToUpdateDatas = (hws) => {
  //hws lúc này là mảng toàn bộ bài tập ở store
  //Giờ ta phải chuyển hóa nó thành mảng với mỗi phần tử là một obj
  //Một obj gồm {id:"id obj bài tập con trong prop baiTapVeNha", baiLamCuaHocSinh: "mảng dùng để update"}
  const updatedDatas = [];
  for (let i = 0; i < hws.length; i++) {
    const curHw = hws[i];
    const curBaiTapVeNha = curHw.baiTapVeNha;
    for (let j = 0; j < curBaiTapVeNha.length; j++) {
      const curBtvn = curBaiTapVeNha[j];
      updatedDatas.push({
        _id: curBtvn._id,
        baiLamCuaHocSinh: curBtvn.baiLamCuaHocSinh,
        soLanNop: +curBtvn.soLanNop || 0,
      });
    }
  }
  return updatedDatas;
};

//NHÓM CB SUBSCRIPTIONS
export const subscriptionSignup = async ({
  username,
  password,
  email,
  dispatch,
  SubscriptionAuthActions,
  router,
  doSetLocalNotification,
  clearLocalNotification,
}) => {
  const fetchUrl = API_HOCSINH + "/subscriptionAuth/signUp";
  try {
    const response = await axios.post(fetchUrl, {
      username,
      password,
      email,
    });
    if (response.data) {
      dispatch(
        SubscriptionAuthActions.setAuth({
          username: response.data.data.data.username,
          isExpired: response.data.data.data.isExpired,
        })
      );
      if (router) router.push("/auth/welcome");
    } else {
      dispatch(SubscriptionAuthActions.clearAuth());
    }
    clearLocalNotification();
  } catch (err) {
    devErrorMessage({
      err,
      from: "helper/axiosApi.js",
    });
    if (err && err.response) {
      devErrorMessage({
        err,
        from: "helper/axiosApi.js",
      });
      doSetLocalNotification({
        status: err.response.status,
        message: err.response.data.data.message || "Lỗi đăng kí mới tài khoản",
      });
    }
  }
};

export const subscriptionSignin = async ({
  username,
  password,
  dispatch,
  SubscriptionAuthActions,
  router,
  setLoggedInDevice,
  doSetLocalNotification,
  clearLocalNotification,
}) => {
  const fetchUrl = API_HOCSINH + "/subscriptionAuth/signIn";
  const axiosInstance = axios.create({ timeout: 5000, withCredentials: true });
  try {
    const response = await axiosInstance.post(fetchUrl, {
      username,
      password,
    });

    if (response.data) {
      dispatch(
        SubscriptionAuthActions.setAuth({
          username: response.data.data.data.username,
          isExpired: response.data.data.data.isExpired,
          expirySubscriptionTime:
            response.data.data.data.expirySubscriptionTime,
        })
      );
      if (response.data.data.data.isExpired) {
        router.replace("/auth/welcome");
      } else {
        router.replace("/products");
      }
      getInfosUserAldreadyLoggedIn;
      // if (router) router.push("/products");
    } else {
      dispatch(SubscriptionAuthActions.clearAuth());
    }
    clearLocalNotification();
  } catch (err) {
    if (err && err.response) {
      devErrorMessage({
        err,
        from: "helper/axiosApi.js",
      });
      if (err.response.status === 429)
        doSetLocalNotification({ status: 429, message: err.response.data });
      if (err.response.data.data)
        doSetLocalNotification({
          status: err.response.status,
          message: err.response.data.data.message || "Lỗi đăng nhập.",
        });
      //Check nếu lỗi 403 thì kích hoạt tính năng đăng xuất khỏi thiết bị cũ
      if (err.response && err.response.status === 403) {
        setLoggedInDevice(true);
      } else {
        setLoggedInDevice(false);
      }
    }
  }
};

export const subscriptionSignOut = async ({
  axiosInstance,
  dispatch,
  router,
  SubscriptionAuthActions,
}) => {
  try {
    await axiosInstance.get(API_HOCSINH + "/subscriptionAuth/signOut");
    dispatch(SubscriptionAuthActions.clearAuth());
    router.replace("/subscription");
  } catch (err) {
    devErrorMessage({
      err,
      from: "helper/axiosApi.js",
    });
  }
};

export const removeDiviceInfos = async ({
  username,
  password,
  dispatch,
  SubscriptionAuthActions,
  router,
  doSetLocalNotification,
  clearLocalNotification,
}) => {
  const fetchUrl = API_HOCSINH + "/subscriptionAuth/removeDeviceInfos";
  try {
    const response = await axios.post(fetchUrl, {
      username,
      password,
    });
    if (response.status === 200) {
      // setError("Đăng xuất trên thiết bị cũ thành công. Tải lại trang...");
      doSetLocalNotification({
        status: response.status,
        message: response.data.data.message + ". Đang tải lại trang",
      });
      setTimeout(() => {
        clearLocalNotification();
        router.reload();
        dispatch(SubscriptionAuthActions.clearAuth());
      }, 1500);
    }
  } catch (err) {
    if (err && err.response) {
      devErrorMessage({
        err,
        from: "helper/axiosApi.js",
      });
      doSetLocalNotification({
        status: err.response.status,
        message:
          err.response.data.data.message ||
          "Lỗi xóa thiết bị cũ đang đăng nhập.",
      });
    }
  }
};

export const forgotPassword = async ({ email, doSetLocalNotification }) => {
  const fetchUrl = API_HOCSINH + "/subscriptionAuth/forgotPassword";
  try {
    const response = await axios.post(fetchUrl, {
      email,
    });
    if (response.status === 200) {
      doSetLocalNotification({
        status: response.status,
        message: `Email hướng dẫn lấy lại password từ nangbuocconyeu@mail.com đã gởi đến email bạn cung cấp.
        Vui lòng kiểm tra email và làm theo hướng dẫn`,
      });
    }
  } catch (err) {
    if (err && err.response) {
      devErrorMessage({
        err,
        from: "helper/axiosApi.js",
      });
      doSetLocalNotification({
        status: err.response.status,
        message:
          err.response.data.data.message || "Lỗi gởi yêu cầu quên mật khẩu.",
      });
    }
  }
};

export const resetPassword = async ({
  token,
  username,
  password,
  doSetLocalNotification,
}) => {
  const fetchUrl = API_HOCSINH + "/subscriptionAuth/resetPassword";
  try {
    //Token này là token query từ url gỏi trong mail của client
    const response = await axios.post(fetchUrl, {
      token,
      username,
      password,
    });
    if (response.status === 200) {
      doSetLocalNotification({
        status: response.status,
        message: response.data.data.message || "Thay đổi password thành công.",
      });
      return "success";
    }
  } catch (err) {
    if (err && err.response) {
      devErrorMessage({
        err,
        from: "helper/axiosApi.js",
      });
      doSetLocalNotification({
        status: err.response.status,
        message: err.response.data.data.message || "Lỗi đổi lại mật khẩu.",
      });
    }
  }
};

//Lấy app infos

export const getAppInfos = async ({ axios }) => {
  const fetchUrl = API_HOCSINH + "/demo/about";
  const response = await axios.get(fetchUrl);
  return response;
};

export const getInfosUserAldreadyLoggedIn = async ({ axiosInstance }) => {
  try {
    const fetchUrl =
      API_HOCSINH +
      "/subscriptionAuth/check-valid-token-user-aldready-loggedIn";
    const response = await axiosInstance.get(fetchUrl);

    const {
      username = "",
      isExpired = true,
      expirySubscriptionTime = "",
    } = response.data.data.data;

    return { username, isExpired, expirySubscriptionTime, message: "" };
  } catch (err) {
    devErrorMessage({
      err,
      from: "helper/axiosApi.js",
    });
    let message = "";
    const { response = {} } = err;
    const { data = {} } = response;
    if (Object.keys(data).length > 0) message = data.data.message;
    return {
      username: "",
      isExpired: true,
      expirySubscriptionTime: "",
      message,
    };
  }
};


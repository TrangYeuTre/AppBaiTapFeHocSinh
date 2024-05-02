import axios from "axios";
import { devErrorMessage } from "./uti";
import staticData from "../data/static.json";

const API_HOCSINH = staticData.API_HOCSINH;

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
      if (router) router.push("/exercises");
    } else {
      dispatch(AuthActions.clearAuth());
    }
    setError("");
  } catch (err) {
    console.log(err);
    if (err) {
      console.log(err);
      devErrorMessage(err.response.data || "Thông tin đăng nhập không đúng.");

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
    devErrorMessage(
      err.response.data || "Load bài tập về nhà cho học sinh lỗi gì đó."
    );
    if (err.response.status === 429) router.replace("/auth");
  }
};

//Nộp bài tập
export const submitAnswers = async ({
  hws,
  axiosInstance,
  hocSinh,
  router,
}) => {
  const fetchUrl = API_HOCSINH + "/homeworks/" + hocSinh;
  const updatedDatas = convertHwsToUpdateDatas(hws);
  try {
    const response = await axiosInstance.put(fetchUrl, updatedDatas);
    if (router) {
      if (response.status === 200) {
        router.push("/exercises/success");
      }
    }
  } catch (err) {
    console.log(err);
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

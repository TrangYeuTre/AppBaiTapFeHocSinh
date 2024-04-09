import axios from "axios";

export const signIn = async ({
  username,
  password,
  dispatch,
  AuthActions,
  router,
  setError,
}) => {
  const fetchUrl = process.env.API_HOCSINH + "/auth/signIn";
  try {
    const response = await axios.post(fetchUrl, {
      username,
      password,
    });
    console.log(response);
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
  }
};

//Lấy toan bộ bài tập về nhà của học sinh (trong thời hạn)
export const getAvailableHomeworks1Student = async ({ id, axiosInstance }) => {
  const fetchUrl = process.env.API_HOCSINH + "/homeworks/" + id;
  try {
    const response = await axiosInstance.get(fetchUrl);
    console.log(response);
    return response.data.data || [];
  } catch (err) {
    console.log(err);
  }
};

//Nộp bài tập
export const submitAnswers = async ({
  hws,
  axiosInstance,
  hocSinh,
  router,
}) => {
  const fetchUrl = process.env.API_HOCSINH + "/homeworks/" + hocSinh;
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
      });
    }
  }
  return updatedDatas;
};

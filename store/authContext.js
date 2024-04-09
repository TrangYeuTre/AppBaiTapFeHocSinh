import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  auth: { token: "", username: "", hocSinh: "" },
  hws: [],
  setAuth: () => {},
  clearAuth: () => {},
  setHws: () => {},
  updateAnswersWriting: () => {},
});

export default function AuthProvider({ children }) {
  const [auth, changeAuth] = useState({ token: "", username: "", hocSinh: "" });
  const [hws, setHws] = useState([]);

  const setAuthHandler = (data) => {
    changeAuth((preState) => {
      return {
        ...preState,
        token: data.token,
        username: data.username,
        hocSinh: data.hocSinh,
      };
    });
    //Lưu local
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("hocSinh", data.hocSinh);
  };

  const clearAuthHandler = () => {
    changeAuth({ token: "", username: "", hocSinh: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("hocSinh");
    setHws([]);
  };

  const setHwsHandler = (data) => {
    setHws(data);
  };

  //CB để ta update riêng cho bài tập dạng viết
  const updateAnswersWriting = ({
    type,
    idObjBaiTap,
    idBaiTapCon,
    cauTraLoi,
  }) => {
    //Xử lý dạng viết trước
    //CHú ý: dạng này là update trực tiếp vào props content trong data chính của bìa tập
    //các dạng khác sẽ update vào prop cauTraLoiHocSinh riêng nha.
    if (type === "viet") {
      setHws((preState) => {
        const clone = [...preState];
        //Loop for để tìm thôi: array - array (baiTapVeNha) - target
        for (let i = 0; i < clone.length; i++) {
          const curObj = clone[i];
          const curBtvn = curObj.baiTapVeNha;
          const target = curBtvn.find((item) => item._id === idObjBaiTap);
          if (target && target.data.viet.active) {
            //Thêm mới hoặc update phần bài làm của học sinh vào prop baiLamCuaHocSinh
            const curBaiLamCuaHocSinh = target.baiLamCuaHocSinh;
            const subTarget = curBaiLamCuaHocSinh.find(
              (item) => item.id === idBaiTapCon
            );
            if (!subTarget) {
              //Thêm mới
              curBaiLamCuaHocSinh.push({
                type: "viet",
                id: idBaiTapCon,
                content: cauTraLoi,
              });
            } else {
              //Update
              subTarget.content = cauTraLoi;
            }
            break;
          }
        }
        //Cập nhật
        return clone;
      });
    }
  };

  const value = {
    auth,
    hws,
    setAuth: setAuthHandler,
    clearAuth: clearAuthHandler,
    setHws: setHwsHandler,
    updateAnswersWriting: updateAnswersWriting,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

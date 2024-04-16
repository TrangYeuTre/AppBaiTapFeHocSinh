import { createSlice } from "@reduxjs/toolkit";

const initState = { token: "", username: "", hocSinh: "" };

const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setAuth(state, action) {
      const { token, username, hocSinh } = action.payload;
      state.token = token;
      state.username = username;
      state.hocSinh = hocSinh;
      //Lưu local
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("hocSinh", hocSinh);
    },
    clearAuth(state) {
      state.token = "";
      state.username = "";
      state.hocSinh = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("hocSinh");
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;

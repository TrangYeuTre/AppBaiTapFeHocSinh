import { createSlice } from "@reduxjs/toolkit";

const initState = {
  token: "",
  username: "",
  // datas: { exercises: [], loadedIndex: 1 },
};

const SubscriptionAuthSlice = createSlice({
  name: "subscriptionAuth",
  initialState: initState,
  reducers: {
    setAuth(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      //Lưu local
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    },
    clearAuth(state) {
      state.token = "";
      state.username = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const SubscriptionAuthActions = SubscriptionAuthSlice.actions;

export default SubscriptionAuthSlice;

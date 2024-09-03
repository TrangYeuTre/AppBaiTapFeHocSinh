import { createSlice } from "@reduxjs/toolkit";

const initState = {
  token: "",
  username: "",
  studentWork: { rightAnswer: 0, wrongAnswers: [] },
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
      state.studentWork = { rightAnswer: 0, wrongAnswers: [] };
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    countRightAnswer(state) {
      if (state.studentWork.rightAnswer === 10) return;
      state.studentWork.rightAnswer++;
    },
    saveWrongAnswer(state, action) {
      const id = action.payload;
      if (!id || state.studentWork.wrongAnswers.find((item) => item === id))
        return;
      state.studentWork.wrongAnswers.push(id);
    },
    resetStudentWork(state) {
      state.studentWork = { rightAnswer: 0, wrongAnswers: [] };
    },
  },
});

export const SubscriptionAuthActions = SubscriptionAuthSlice.actions;

export default SubscriptionAuthSlice;

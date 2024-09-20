import { createSlice } from "@reduxjs/toolkit";

const initState = {
  username: "",
  isExpired: true,
  expirySubscriptionTime: "",
  studentWork: { rightAnswer: 0, wrongAnswers: [], rightAnswers: [] },
};

const SubscriptionAuthSlice = createSlice({
  name: "subscriptionAuth",
  initialState: initState,
  reducers: {
    setAuth(state, action) {
      const {
        username = "",
        isExpired = true,
        expirySubscriptionTime = "",
      } = action.payload;
      state.username = username;
      state.isExpired = isExpired;
      state.expirySubscriptionTime = expirySubscriptionTime;
      //Lưu local
      localStorage.setItem("username", username);
    },
    clearAuth(state) {
      state.username = "";
      state.isExpired = true;
      state.expirySubscriptionTime = "";
      state.studentWork = {
        rightAnswer: 0,
        wrongAnswers: [],
        rightAnswers: [],
      };
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
    saveRightAnswer(state, action) {
      const id = action.payload;
      if (!id || state.studentWork.rightAnswers.find((item) => item === id))
        return;
      state.studentWork.rightAnswers.push(id);
    },

    resetStudentWork(state) {
      state.studentWork = {
        rightAnswer: 0,
        wrongAnswers: [],
        rightAnswers: [],
      };
    },
  },
});

export const SubscriptionAuthActions = SubscriptionAuthSlice.actions;

export default SubscriptionAuthSlice;

import { createSlice } from "@reduxjs/toolkit";

const initState = {
  homeworks: [],
  amountHomeworks: 0,
  loadOrdinalNubmer: 1,
};

const HwsRenderSlice = createSlice({
  name: "hwsRender",
  initialState: initState,
  reducers: {
    setHomeworksRender(state, action) {
      console.log(action.payload);
      const { homeworks, amountHomeworks, loadOrdinalNubmer } = action.payload;
      state.homeworks = homeworks;
      state.amountHomeworks = amountHomeworks;
      state.loadOrdinalNubmer = loadOrdinalNubmer;
    },
  },
});

export const HwsRenderActions = HwsRenderSlice.actions;

export default HwsRenderSlice;

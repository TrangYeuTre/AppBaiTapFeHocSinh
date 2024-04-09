import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./authSlice";
import HwsSlice from "./hwsSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    hws: HwsSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./authSlice";
import HwsSlice from "./hwsSlice";
import HwsRenderSlice from "./hwsRenderSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    hws: HwsSlice.reducer,
    hwsRender: HwsRenderSlice.reducer,
  },
});

export default store;

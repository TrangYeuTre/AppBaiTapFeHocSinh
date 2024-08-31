import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./authSlice";
import HwsSlice from "./hwsSlice";
import HwsRenderSlice from "./hwsRenderSlice";
import SubscriptionAuthSlice from "./subscriptionSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    hws: HwsSlice.reducer,
    hwsRender: HwsRenderSlice.reducer,
    subscriptionAuth: SubscriptionAuthSlice.reducer,
  },
});

export default store;

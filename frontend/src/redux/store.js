import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./shipmentSlice";

const store = configureStore({
  reducer: {
    shipments: shipmentReducer,
  },
});

export default store;

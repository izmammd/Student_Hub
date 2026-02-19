import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Slice/useSlice.js";

export const store = configureStore({
    reducer : {
        user:userReducer,
    }
})
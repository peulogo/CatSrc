import { itemReducer } from "./reducer";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        reducer: itemReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
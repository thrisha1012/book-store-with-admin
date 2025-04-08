import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // Import auth reducer

const store = configureStore({
    reducer: {
        auth: authReducer, // Add auth slice to store
    },
});

export default store;

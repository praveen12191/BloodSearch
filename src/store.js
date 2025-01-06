import { configureStore } from "@reduxjs/toolkit";

import dropdownReducer from "./components/feature/dropdown";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer, // Add it as part of a combined reducer
    },
});

export default store;
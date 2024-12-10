// Don't add any asynchronous logic or other "side effects" in reducer
// For example, logging a value to the console, ajax
// Just keep it simple
import { createSlice } from "@reduxjs/toolkit";
export interface AppState {
    initialState: boolean;
    theme: string;
}
const initialState: AppState = {
    initialState: false,
    theme: "light",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        getTheme: (state) => {
            state.theme = localStorage.getItem("theme") || "light";
        },
    },
});
export const { getTheme } = appSlice.actions;

export default appSlice.reducer;

// Don't add any asynchronous logic or other "side effects" in reducer
// For example, logging a value to the console, ajax
// Just keep it simple
import { createSlice } from "@reduxjs/toolkit";

interface SearchInterface {
    keyword: string;
    gender: string;
    category: string;
    page: number;
    pageSize: number;
    sort: string;
    sortDirection: string;
}
export interface AppState {
    searchParams: SearchInterface;
}
const initialState: AppState = {
    searchParams: {
        keyword: "",
        gender: "",
        category: "",
        page: 1,
        pageSize: 12,
        sort: "",
        sortDirection: "",
    },
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
        removeSearchParams: (state) => {
            state.searchParams = initialState.searchParams;
        },
    },
});

export const { setSearchParams, removeSearchParams } = appSlice.actions;

export default appSlice.reducer;

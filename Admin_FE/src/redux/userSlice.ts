import { User } from "@/data/User.interface";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    accessToken: string;
    refreshToken: string;
    userInfo: User | null;
    error: string;
    message: string;
}
const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("refreshToken");
const initialState: UserState = {
    accessToken: accessToken || "",
    refreshToken: refreshToken || "",
    userInfo: {
        id: "",
        userName: "",
        email: "",
        password: "",
        activeFlag: false,
        removalFlag: false,
        userProfile: {
            id: "",
            name: "",
            avatar: {
                id: "",
                fileName: "",
                fileType: "",
                url: "",
            },
            removalFlag: false,
        },
    },
    error: "",
    message: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.userInfo = initialState.userInfo;
        },
        updateToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        update: (state, action) => {
            state.userInfo = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetUserState: (state) => {
            console.log("resetState");
            state.accessToken = "";
            state.refreshToken = "";
            state.userInfo = initialState.userInfo;
            state.message = "";
            state.error = "";
        },
    },
});

export default userSlice.reducer;
export const { clearUser, updateToken, update, setMessage, resetUserState } =
    userSlice.actions;

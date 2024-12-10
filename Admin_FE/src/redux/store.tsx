import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface RootStateCustom {
    app: AppState;
    user: UserState;
}

const loadState = (): RootStateCustom | undefined => {
    try {
        const serializedState = sessionStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("state", serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

const persistedState = loadState();
import appReducer, { AppState } from "./appSlice";
import userReducer, { UserState } from "./userSlice";
const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

    preloadedState: persistedState,
});

// This is actually call every time when store saved
store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

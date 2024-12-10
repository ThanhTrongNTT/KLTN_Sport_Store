import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store.ts";
import Loading from "./components/loading/Loading.tsx";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Suspense fallback={<Loading />}>
        <Provider store={store}>
            <App />
            <ToastContainer position="bottom-right" />
        </Provider>
    </Suspense>
    // <React.StrictMode>
    // </React.StrictMode>
);

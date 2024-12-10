import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import store from "./redux/store";
import DeclareRouter from "./routes";
import Loading from "./components/common/Loading";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
    <Suspense fallback={<Loading />}>
        <Provider store={store}>
            <Router>
                <ToastContainer />
                <DeclareRouter />
            </Router>
        </Provider>
    </Suspense>
    // </React.StrictMode>
);

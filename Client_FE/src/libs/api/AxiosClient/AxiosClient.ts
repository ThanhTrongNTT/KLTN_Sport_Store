import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useLoadingStore from "../../../redux/store/loading.store";
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const AxiosClient = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "https://thanhtrongsport-be-production.up.railway.app/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});
// @ts-ignore
AxiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    // useLoadingStore.setState({ loading: true });
    const accessToken = await Cookies.get("accessToken");
    if (accessToken)
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    return await config;
});
AxiosClient.interceptors.response.use(
    async (response) => {
        // useLoadingStore.setState({ loading: false });
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        // useLoadingStore.setState({ loading: false });
        console.log(error);
        if (!error.response) {
            toast.error(error.message, {
                autoClose: 1000,
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        } else {
            if (error.response.status === 401) {
                const prevRequest = error.config;
                const refreshToken = await Cookies.get("refreshToken");
                prevRequest.sent = true;
                console.log("refreshToken: ", refreshToken);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const newAccessToken = await axios
                    .post(
                        `https://thanhtrongsport-be-production.up.railway.app/api/v1/refresh-token/${refreshToken}`,
                        config
                    )
                    .catch((error) => {
                        console.log("error", error);
                    });
                console.log("newAccessToken", newAccessToken);
                if (
                    newAccessToken &&
                    newAccessToken.data &&
                    newAccessToken.data.data.accessToken
                ) {
                    Cookies.set(
                        "accessToken",
                        newAccessToken.data.data.accessToken
                    );
                }
            }
            toast.error(error.response.data.message, {
                autoClose: 1000,
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        }
        return Promise.reject(error);
    }
);
export default AxiosClient;

// api/axiosClient.js
import { ApiResponse } from "@/data/payload";
import useLoadingStore from "@/redux/store/loadingStore";
import { MessageErrorSystem } from "@/utils/Message";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const baseUrl = "https://thanhtrongsport-be-production.up.railway.app/api/v1/";
const AxiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});
AxiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = await sessionStorage.getItem("accessToken");
        if (accessToken)
            config.headers.set("Authorization", `Bearer ${accessToken}`);
        return await config;
    }
);
AxiosClient.interceptors.response.use(
    async (response) => {
        return response?.data || response;
    },
    async (error) => {
        const errorResponse: ApiResponse<null> = {
            result: error.result,
            code: error.response?.status || 500,
            message: "",
            data: null,
        };
        if (error.code === "ERR_NETWORK") {
            // toast.error(MessageErrorSystem, {
            //     autoClose: 5000,
            //     draggable: true,
            //     pauseOnHover: true,
            //     position: "bottom-right",
            // });
            errorResponse.message = MessageErrorSystem;
        } else if (!error.response.data) {
            // toast.error(error.message, {
            //     autoClose: 5000,
            //     draggable: true,
            //     pauseOnHover: false,
            //     position: "bottom-right",
            // });
            errorResponse.message = error.message;
        } else {
            // toast.error(error.response.data.message, {
            //     autoClose: 5000,
            //     delay: 10,
            //     draggable: true,
            //     pauseOnHover: false,
            //     position: "bottom-right",
            // });
            errorResponse.message = error.response.data.message;
        }
        toast.error(errorResponse.message, {
            autoClose: 5000,
            draggable: true,
            pauseOnHover: false,
            position: "bottom-right",
        });
        const { status } = error.response || {};
        const prevRequest = error.config;
        const refreshToken = await sessionStorage.getItem("refreshToken");
        // if (!error.response.status) {
        //     return error.message;
        // } else if (status === 401) {
        //     prevRequest.sent = true;
        //     console.log("refreshToken: ", refreshToken);
        //     const config = {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     };
        //     const newAccessToken = await axios.post(
        //         `${baseUrl}${refreshToken}`,
        //         config
        //     );
        //     if (newAccessToken.data.accessToken) {
        //         console.log("newAccessToken", newAccessToken);
        //         sessionStorage.setItem(
        //             "accessToken",
        //             newAccessToken.data.accessToken
        //         );
        //     }
        // }
        if (status === 401 && !prevRequest?.sent && refreshToken) {
            try {
                prevRequest.sent = true;

                // Yêu cầu token mới
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const response = await axios.post(
                    `${baseUrl}${refreshToken}`,
                    {},
                    config
                );

                const newAccessToken = response?.data?.accessToken;
                if (newAccessToken) {
                    console.log("New Access Token:", newAccessToken);

                    // Cập nhật Access Token trong sessionStorage
                    sessionStorage.setItem("accessToken", newAccessToken);

                    // Gắn Access Token mới vào header và thử lại request
                    prevRequest.headers["Authorization"] =
                        `Bearer ${newAccessToken}`;
                    return axios(prevRequest);
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default AxiosClient;

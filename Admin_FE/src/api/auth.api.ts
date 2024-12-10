import { AxiosResponse } from "axios";
import AxiosClient from "./axiosClient/AxiosClient";
import { LoginData } from "@/data/Interface";

const AuthAPI = {
    login: (
        email: string,
        password: string
    ): Promise<AxiosResponse<LoginData>> => {
        const url = "auth/login";
        return AxiosClient.post(url, { email, password });
    },
    logout: () => {
        const url = "auth/logout";
        return AxiosClient.post(url);
    },
    refreshToken: (refreshToken: string) => {
        const url = `auth/refresh-token`;
        return AxiosClient.post(url, { refreshToken });
    },
};

export default AuthAPI;

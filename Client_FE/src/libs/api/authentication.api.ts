import { ApiResponse } from "./../../data/payload";
import { AxiosResponse } from "axios";
import AxiosClient from "./axiosClient/AxiosClient";
import { User } from "../../data/User";

// TODO: Add types for the response
const AuthenticationApi = {
    login: (email: string, password: string): Promise<AxiosResponse> => {
        const url = `auth/login`;
        return AxiosClient.post(url, { email, password });
    },
    logout: (): Promise<AxiosResponse> => {
        const url = `auth/logout`;
        return AxiosClient.post(url, {}, { withCredentials: true });
    },
    refreshToken: (refreshToken: string): Promise<AxiosResponse> => {
        const url = `auth/refresh-token`;
        return AxiosClient.post(url, { refreshToken });
    },
    register: (user: User): Promise<ApiResponse<User>> => {
        const url = `auth/register`;
        return AxiosClient.post(url, user);
    },
    forgotPassword: (email: string): Promise<ApiResponse<boolean>> => {
        const url = `auth/forgot-password`;
        return AxiosClient.post(url, { email });
    },
};

export default AuthenticationApi;

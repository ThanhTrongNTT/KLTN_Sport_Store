import {
    ChangePasswordRequest,
    PageResponse,
    SearchParams,
} from "@/data/Interface";
import { AxiosResponse } from "axios";
import AxiosClient from "./axiosClient/AxiosClient";
import { ApiResponse } from "@/data/payload";
import { User } from "@/data/User.interface";

const userApi = {
    getMe: (email: string): Promise<ApiResponse<User>> => {
        const url = `user/${email}`;
        return AxiosClient.get(url);
    },
    getUsers: (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<User>> => {
        const url = `users?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getById: (id: string) => {
        const url = `users/${id}`;
        return AxiosClient.get(url);
    },
    updateProfile: (user: User, email: string) => {
        const url = `user/${email}`;
        return AxiosClient.put(url, user);
    },
    deleteUser: (id: string, userId: string): Promise<ApiResponse<boolean>> => {
        const url = `user/${id}?userId=${userId}`;
        return AxiosClient.delete(url);
    },
    searchUser: (searchParam: SearchParams) => {
        const url = `users/search-by-name?keyword=${searchParam.keyWord}&pageNo=${searchParam.pageNo}&pageSize=${searchParam.pageSize}&sortBy=${searchParam.sortBy}&sortDir=${searchParam.sortDir}`;
        return AxiosClient.get(url);
    },
    // updateAvatar: (email: string, avatar: string) => {
    //     const url = `user/avt/${email}`;
    //     return AxiosClient.put(url, avatar);
    // },
    changePassword: (changePasswordRequest: ChangePasswordRequest) => {
        const url = `user/change-password`;
        return AxiosClient.post(url, changePasswordRequest);
    },
    activeUser: async (user: User): Promise<AxiosResponse> => {
        const url = `user/active/${user.email}`;
        return await AxiosClient.post(url);
    },
    deactiveUser: async (user: User): Promise<AxiosResponse> => {
        const url = `user/deactive/${user.email}`;
        return await AxiosClient.post(url);
    },
};
export default userApi;

import { AxiosResponse } from "axios";
import AxiosClient from "./axiosClient/AxiosClient";
import { User } from "../../data/User";

const userApi = {
    getMe: (email: string): Promise<AxiosResponse<User>> => {
        const url = `user/${email}`;
        return AxiosClient.get(url);
    },
};
export default userApi;

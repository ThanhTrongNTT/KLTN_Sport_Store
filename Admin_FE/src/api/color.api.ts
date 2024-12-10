import { PageResponse } from "@/data/Interface";
import { Color } from "@/data/Product.interface";
import AxiosClient from "./axiosClient/AxiosClient";
import { ApiResponse } from "@/data/payload";

const colorAPI = {
    getAllColors: async (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Color>> => {
        const url = `colors?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getListColors: async (): Promise<ApiResponse<Color[]>> => {
        const url = "colors/list";
        return AxiosClient.get(url);
    },
    createColor: async (data: Color): Promise<ApiResponse<Color>> => {
        const url = "color";
        return AxiosClient.post(url, data);
    },
    updateColor: async (data: Color): Promise<ApiResponse<Color>> => {
        const url = `color/${data.id}`;
        return AxiosClient.put(url, data);
    },
    deleteColor: async (id: string): Promise<ApiResponse<Color>> => {
        const url = `color/${id}`;
        return AxiosClient.delete(url);
    },
};

export default colorAPI;

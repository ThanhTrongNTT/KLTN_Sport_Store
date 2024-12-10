import { Sale } from "@/data/Sale.interface";
import AxiosClient from "./axiosClient/AxiosClient";
import { ApiResponse } from "@/data/payload";
import { PageResponse } from "@/data/Interface";

const saleAPI = {
    getAllSales: async (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Sale>> => {
        const url = `sales?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getListSales: async (): Promise<ApiResponse<Sale[]>> => {
        const url = "sales/list";
        return AxiosClient.get(url);
    },
    createSale: async (data: Sale): Promise<ApiResponse<Sale>> => {
        const url = "sale";
        return AxiosClient.post(url, data);
    },
    updateSale: async (data: Sale): Promise<ApiResponse<Sale>> => {
        const url = `sale/${data.id}`;
        return AxiosClient.put(url, data);
    },
    deleteSale: async (id: string): Promise<ApiResponse<Sale>> => {
        const url = `sale/${id}`;
        return AxiosClient.delete(url);
    },
};
export default saleAPI;

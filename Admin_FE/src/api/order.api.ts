import { AxiosResponse } from "axios";
import AxiosClient from "./axiosClient/AxiosClient";
import { PageResponse } from "@/data/Interface";
import { Order } from "@/data/Order.interface";
import { ApiResponse } from "@/data/payload";

const OrderAPI = {
    getAllOrders: (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Order>> => {
        const url = `orders?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getOrderByUserId: (email: string): Promise<ApiResponse<Order>> => {
        const url = `orders/email/${email}`;
        return AxiosClient.get(url);
    },
    getOrderById: (id: string): Promise<ApiResponse<Order>> => {
        const url = `orders/${id}`;
        return AxiosClient.get(url);
    },
    deleteOrder: (id: string): Promise<ApiResponse<boolean>> => {
        const url = `orders/${id}`;
        return AxiosClient.delete(url);
    },
    updateOrderStatus: (
        id: string,
        status: string
    ): Promise<ApiResponse<Order>> => {
        const url = `order/${id}/status?status=${status}`;
        return AxiosClient.put(url, { status });
    },
};
export default OrderAPI;

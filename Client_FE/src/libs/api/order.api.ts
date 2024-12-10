import { Order, OrderItem } from "./../../data/Order";
import { ApiResponse, PageResponse } from "../../data/payload";
import AxiosClient from "./axiosClient/AxiosClient";
export interface OrderRequest {
    order: Order;
    orderItems: OrderItem[];
}
const orderApi = {
    createOrder: async (
        orderRequest: OrderRequest
    ): Promise<ApiResponse<Order>> => {
        const url = `/order/${orderRequest.order?.user?.email}/add`;
        return AxiosClient.post(url, orderRequest);
    },
    getOrderByUser: async (email: string): Promise<PageResponse<Order>> => {
        const url = `/orders/email/${email}`;
        return AxiosClient.get(url);
    },
    paymentMomo: async (order: Order): Promise<ApiResponse<string>> => {
        const url = `/momo`;
        return AxiosClient.post(url, order);
    },
    paidOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
        const url = `/order/${orderId}/paid`;
        return AxiosClient.put(url);
    },
};
export default orderApi;

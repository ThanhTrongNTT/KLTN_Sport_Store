import { ApiResponse } from "@/data/payload";
import AxiosClient from "./axiosClient/AxiosClient";
import { Coupon } from "@/data/Coupon.interface";
import { PageResponse } from "@/data/Interface";

const couponAPI = {
    getAllCoupon: async (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Coupon>> => {
        const url = `/coupons?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    createCoupon: async (data: Coupon): Promise<ApiResponse<Coupon>> => {
        const url = "/coupon";
        return AxiosClient.post(url, data);
    },
    updateCoupon: async (data: Coupon): Promise<ApiResponse<Coupon>> => {
        const url = `/coupon/${data.id}`;
        return AxiosClient.put(url, data);
    },
    deleteCoupon: async (id: string): Promise<ApiResponse<Coupon>> => {
        const url = `/coupon/${id}`;
        return AxiosClient.delete(url);
    },
};

export default couponAPI;

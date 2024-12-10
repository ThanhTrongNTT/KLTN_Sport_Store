import { formatter } from "./Sale.interface";

export interface Coupon {
    id?: string;
    code?: string;
    discount?: number;
    description?: string;
    startDate?: string;
    endDate?: string;
}

const currentDate = new Date();
export const initCouponValue: Coupon = {
    id: "",
    description: "",
    code: "",
    discount: 0,
    startDate: formatter.format(currentDate).replace(",", ""),
    endDate: formatter.format(currentDate).replace(",", ""),
};

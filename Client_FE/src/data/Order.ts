import { ProductItem } from "./Product";
import { User } from "./User";

export interface Order {
    id?: string;
    productsCount?: number;
    note?: string;
    user?: User | null;
    subTotal?: number;
    tax?: number;
    total?: number;
    status?: string;
    paymentMethod?: string;
    address?: Address | null;
    isPaid?: boolean;
}
export const initOrder = {
    id: "",
    productsCount: 0,
    note: "",
    user: null,
    subTotal: 0,
    tax: 0,
    total: 0,
    status: "",
    paymentMethod: "",
    address: null,
    isPaid: false,
};

interface Address {
    addressData?: string;
    ward?: string;
    district?: string;
    province?: string;
    phone?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

export interface OrderItem {
    id?: string;
    quantity?: number;
    product?: ProductItem;
    order?: Order;
    subTotal?: number;
}

import { ProductItem } from "./Product.interface";
import { User } from "./User.interface";
export interface Order {
    id?: string;
    productsCount?: number;
    note?: string;
    user?: User;
    subTotal?: number;
    tax?: number;
    total?: number;
    status?: string;
    paymentMethod?: string;
    address?: Address;
    isPaid?: boolean;
}

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

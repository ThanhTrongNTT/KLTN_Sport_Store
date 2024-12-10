import { Product } from "./Product";

export interface CartDetail {
    id?: string;
    product?: Product;
    quantity?: number;
    removalFlag?: boolean;
}

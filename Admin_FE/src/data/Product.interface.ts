import { Image, initImage } from "./Image.interface";
import { Sale } from "./Sale.interface";

export const initColor: Color = {
    id: "",
    code: "",
    displayCode: "",
    name: "",
};

export interface Product {
    id?: string;
    freeInformation?: string;
    longDescription?: string;
    washingInformation?: string;
    productName?: string;
    slug?: string;
    basePrice?: number;
    promoPrice?: number | null;
    gender?: Category | null;
    category?: Category | null;
    sales?: Sale | null;
    subImages?: Image[];
}

export const initProduct: Product = {
    id: "",
    productName: "",
    freeInformation: "",
    longDescription: "",
    washingInformation: "",
    slug: "",
    basePrice: 0,
    promoPrice: null,
    gender: null,
    category: null,
    sales: null,
    subImages: [],
};

export interface ProductItem {
    id?: string;
    color?: Color | null;
    size?: string;
    stock?: number;
    mainImage?: Image | null;
    product?: Product;
}
export const initProductItem: ProductItem = {
    id: "",
    color: null,
    size: "",
    stock: 0,
    mainImage: initImage,
    product: initProduct,
};
export interface Category {
    id?: string;
    categoryName?: string;
    level?: number;
    locale?: string;
    parentCategory?: Category | null;
}

export const initCategory: Category = {
    categoryName: "",
    locale: "",
    level: 1,
    parentCategory: null,
    id: "",
};

export interface Color {
    id?: string;
    code?: string;
    displayCode?: string;
    name?: string;
}

import { Sale } from "./Sale";

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

export interface Category {
    id?: string;
    categoryName?: string;
    level?: number;
    locale?: string;
    parentCategory?: Category | null;
}

interface Size {
    code: string;
    displayCode: string;
    name: string;
}
interface Rating {
    average: number;
    rating: number;
    comment: string;
}
interface PriceProduct {
    base: number;
    promo: number;
}
export interface Color {
    id?: string;
    code?: string;
    displayCode?: string;
    name?: string;
}

interface ImageProduct {
    main: Image[];
    chips: Image[];
    subImages: Image[];
}

interface Image {
    id: string;
    url: string;
    fileName: string;
    fileType: string;
}

export interface ProductItem {
    id?: string;
    color?: Color | null;
    size?: string;
    stock?: number;
    mainImage?: Image | null;
    product?: Product | null;
}

export const initProductItem: ProductItem = {
    id: "",
    color: null,
    size: "",
    stock: 1,
    mainImage: null,
    product: null,
};
interface Stock {
    statusCode: string;
    statusLocalized: string;
    quantity: number;
    transitStatus: string;
}

import { ApiResponse, PageResponse } from "../../data/payload";
import { Product, ProductItem } from "../../data/Product";
// import { PageResponse } from "../../data/type.interface";
import AxiosClient from "./axiosClient/AxiosClient";

const productApi = {
    getAllProducts: (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Product>> => {
        const url = `products?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    searchProductByPrice: (
        minPrice: number,
        maxPrice: number,
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ) => {
        const url = `products/search-by-price?minPrice=${minPrice}&maxPrice=${maxPrice}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getProductById: (id: string) => {
        const url = `products/${id}`;
        return AxiosClient.get(url);
    },
    getProductBySlug: (slug: string): Promise<ApiResponse<Product>> => {
        const url = `products/slug/${slug}`;
        return AxiosClient.get(url);
    },
    searchProductsByCategory: (
        gender: string,
        category: string,
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Product>> => {
        const url = `/products/search-by-category?genderName=${gender}&categoryName=${category}&pageNo=${
            pageNo - 1
        }&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getProductItemsList: (ids: string): Promise<ApiResponse<ProductItem[]>> => {
        const url = `products/items-list/${ids}`;
        return AxiosClient.get(url);
    },
    getProductItemById: (id: string): Promise<ApiResponse<ProductItem>> => {
        const url = `products/items/${id}`;
        return AxiosClient.get(url);
    },
};

export default productApi;

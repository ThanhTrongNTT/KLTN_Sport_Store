import { Product, ProductItem } from "@/data/Product.interface";
import AxiosClient from "./axiosClient/AxiosClient";
import { AxiosResponse } from "axios";
import { PageResponse, SearchParams } from "@/data/Interface";
import { ApiResponse } from "@/data/payload";

const ProductAPI = {
    getAllProducts: (
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<Product>> => {
        const url = `products?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    searchProductByName: (searchParam: SearchParams) => {
        const url = `products/search-by-name?keyword=${searchParam.keyWord}&pageNo=${searchParam.pageNo}&pageSize=${searchParam.pageSize}&sortBy=${searchParam.sortBy}&sortDir=${searchParam.sortDir}`;
        return AxiosClient.get(url);
    },
    searchProductByCategory: (
        categoryname: string,
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ) => {
        const url = `products/search-by-category?categoryname=${categoryname}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
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
    addProduct: (product: Product) => {
        const url = `product`;
        return AxiosClient.post(url, product);
    },
    updateProduct: (
        product: Product,
        id: string
    ): Promise<ApiResponse<Product>> => {
        const url = `product/${id}`;
        return AxiosClient.put(url, product);
    },
    deleteProduct: (id: string): Promise<ApiResponse<Product>> => {
        const url = `product/${id}`;
        return AxiosClient.delete(url);
    },
    getProductBySlug: (slug: string): Promise<ApiResponse<Product>> => {
        const url = `products/slug/${slug}`;
        return AxiosClient.get(url);
    },
    getProductItem: (
        id: string,
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string
    ): Promise<PageResponse<ProductItem>> => {
        const url = `product/items/${id}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    createProductItem: (
        data: ProductItem
    ): Promise<ApiResponse<ProductItem>> => {
        const url = `product/item/${data.product?.id}`;
        return AxiosClient.post(url, data);
    },
    updateProductItem: (
        data: ProductItem
    ): Promise<ApiResponse<ProductItem>> => {
        const url = `product/item/${data.id}`;
        return AxiosClient.put(url, data);
    },
    deleteProductItem: (id: string): Promise<ApiResponse<ProductItem>> => {
        const url = `product/item/${id}`;
        return AxiosClient.delete(url);
    },
};
export default ProductAPI;

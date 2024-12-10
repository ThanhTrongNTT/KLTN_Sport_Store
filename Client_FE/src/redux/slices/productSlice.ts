import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../data/Product";
import productApi from "../../libs/api/product.api";

interface SearchInterface {
    keyword: string;
    gender: string;
    category: string;
    page: number;
    pageSize: number;
    sort: string;
    sortDirection: string;
}
export interface ProductState {
    searchParams: SearchInterface;
    popularProducts: Product[];
    newProducts: Product[];
    viewedProducts: Product[];
    bundledProducts: Product[];
}
const initialState: ProductState = {
    searchParams: {
        keyword: "",
        gender: "",
        category: "",
        page: 1,
        pageSize: 12,
        sort: "",
        sortDirection: "",
    },
    popularProducts: [],
    newProducts: [],
    viewedProducts: [],
    bundledProducts: [],
};

export const popular = createAsyncThunk("product/popular", async () => {
    const response = await productApi.getAllProducts(
        0,
        12,
        "modifiedDate",
        "desc"
    );
    return response.data.items;
});

export const newProducts = createAsyncThunk("product/newProducts", async () => {
    const response = await productApi.getAllProducts(
        0,
        12,
        "modifiedDate",
        "desc"
    );
    console.log(response.data.items);

    return response.data.items;
});

export const viewed = createAsyncThunk("product/viewed", async () => {
    const response = await productApi.getAllProducts(
        0,
        12,
        "modifiedDate",
        "desc"
    );
    return response.data.items;
});

export const bundle = createAsyncThunk("product/bundle", async () => {
    const response = await productApi.getAllProducts(
        0,
        12,
        "modifiedDate",
        "desc"
    );
    return response.data.items;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
        removeSearchParams: (state) => {
            state.searchParams = initialState.searchParams;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(popular.fulfilled, (state, action) => {
                state.popularProducts = action.payload;
            })
            .addCase(newProducts.fulfilled, (state, action) => {
                state.newProducts = action.payload;
            })
            .addCase(viewed.fulfilled, (state, action) => {
                state.viewedProducts = action.payload;
            })
            .addCase(bundle.fulfilled, (state, action) => {
                state.bundledProducts = action.payload;
            });
    },
});

export const { setSearchParams, removeSearchParams } = productSlice.actions;

export const getPopularProducts = (state: { product: ProductState }) =>
    state.product.popularProducts;
export const getNewProducts = (state: { product: ProductState }) =>
    state.product.newProducts;
export const getViewedProducts = (state: { product: ProductState }) =>
    state.product.viewedProducts;
export const getBundledProducts = (state: { product: ProductState }) =>
    state.product.bundledProducts;

export default productSlice.reducer;

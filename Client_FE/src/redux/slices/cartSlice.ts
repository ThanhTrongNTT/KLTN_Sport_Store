// Don't add any asynchronous logic or other "side effects" in reducer
// For example, logging a value to the console, ajax
// Just keep it simple
import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../data/Product";

export interface CartItem {
    productItem: ProductItem;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(state);

            const newProduct = action.payload;
            console.log(newProduct);

            const existingProduct = state.items.find(
                (item) => item.productItem.id === newProduct.id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ productItem: newProduct, quantity: 1 });
            }
        },
        removeCart: (state, action) => {
            const productId = action.payload;
            const index = state.items.findIndex(
                (item) => item.productItem.id === productId
            );

            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        updateCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.items.find(
                (item) => item.productItem.id === productId
            );

            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeCart, updateCart, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;

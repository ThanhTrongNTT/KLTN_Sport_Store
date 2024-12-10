import React from "react";
import ImageCustom from "../Image/ImageCustom";
import { CartDetail } from "../../data/CartDetail";
import { ProductItem } from "../../data/Product";
import { CartItem } from "../../redux/slices/cartSlice";
type OrderCardProps = {
    cartItem: CartItem;
    index: number;
    id?: string;
};

const OrderCart = ({ cartItem, index, id }: OrderCardProps) => {
    return (
        <div className="flex items-center gap-x-4 p-3 w-full">
            <div className="w-20 h-20 col-span-2">
                <ImageCustom
                    src={
                        // cartItem.product.images.length > 0
                        //   ? cartItem.product.images[0].url
                        //   :
                        "https://readymadeui.com/images/product1.webp"
                    }
                    alt={
                        cartItem?.productItem?.product?.productName ||
                        "Product Image"
                    }
                    rounded
                />
            </div>
            <div className="flex gap-x-3 cursor-default">
                <span
                    className="mx-2 truncate"
                    title={cartItem?.productItem.product?.productName}
                >
                    {cartItem?.productItem.product?.productName}
                </span>
                <span>
                    {cartItem.productItem.product?.category?.locale}{" "}
                    {cartItem.productItem.size}
                </span>
                <span className="h-7 w-8 bg-gray-200 text-center items-center content-center">
                    {cartItem.quantity}
                </span>
                <span>
                    {(
                        (cartItem?.productItem.product?.promoPrice ?? 0) *
                        cartItem.quantity
                    ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            </div>
        </div>
    );
};

export default OrderCart;

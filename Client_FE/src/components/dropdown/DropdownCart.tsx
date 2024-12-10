import React from "react";
import { CartItem } from "../../redux/slices/cartSlice";

interface DropdownCartProps {
    items: CartItem[];
}
const DropdownCart = ({ items }: DropdownCartProps) => {
    return (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
            {items.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {items.map((item, index) => (
                        <li key={index} className="py-2 flex items-center">
                            <img
                                // src={item.image}
                                src={
                                    "https://readymadeui.com/images/product1.webp"
                                }
                                alt={"Thanh"}
                                // alt={item.name}
                                className="w-10 h-10 object-fit rounded-lg"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-800">
                                    {item.productItem.product?.productName}{" "}
                                    {`(${item.quantity})`}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.productItem.product?.promoPrice?.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.productItem.product?.gender?.locale}{" "}
                                    Category:{" "}
                                    {item.productItem.product?.category?.locale}{" "}
                                    Size: {item.productItem.size}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500">
                    Giỏ hàng của bạn đang trống.
                </p>
            )}
        </div>
    );
};

export default DropdownCart;

import React from "react";
import { useNavigate } from "react-router-dom";
import ImageCustom from "../Image/ImageCustom";
import StarRating from "../rating/StarRating";
import { Product } from "../../data/Product";
import classNames from "../../libs/utils/classNames";
interface ProductItemProps {
    product: Product;
}
const ProductItem = ({ product }: ProductItemProps) => {
    const navigate = useNavigate();

    const getRandomStar = () => {
        // Tạo số ngẫu nhiên từ 1 đến 5 với bước nhảy 0.5
        const randomValue = Math.random() * (5 - 1) + 1;
        return Math.round(randomValue * 2) / 2;
    };
    return (
        <div className="flex max-w-xs h-full flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-[#424242] bg-white dark:bg-[#1E1E1E]  transition transform ease-in-out duration-300 hover:scale-105 dark:hover:shadow-gray-800 hover:shadow-lg">
            <div
                className="relative mx-3 mt-3 flex h-70 overflow-hidden rounded-xl cursor-pointer"
                onClick={() => navigate(`/product/${product.slug}`)}
            >
                <ImageCustom
                    className="object-cover w-full"
                    src={"https://readymadeui.com/images/product1.webp"}
                    alt=""
                />
            </div>
            <div className="mt-4 px-5 pb-5 flex flex-col justify-between h-1/2">
                <div className="flex justify-between font-semibold text-gray-400">
                    <span>{product.gender ? product.gender.locale : ""}</span>
                    <span>{"Size".toUpperCase()}</span>
                </div>
                <h5 className="text-xl font-bold tracking-tight text-slate-900 dark:text-[#E0E0E0] truncate cursor-pointer">
                    {product.productName}
                </h5>
                <div className="mt-2">
                    <p>
                        <span
                            className={classNames(
                                "text-base font-semibold text-black dark:text-[#E0E0E0]",
                                product.basePrice === product.promoPrice
                                    ? ""
                                    : "line-through"
                            )}
                        >
                            {product.basePrice?.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </span>
                    </p>
                    {product.basePrice === product.promoPrice || (
                        <p>
                            <span className="text-xl font-bold text-red-500">
                                {product.promoPrice?.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        </p>
                    )}
                </div>
                <span className="text-base text-red-500 truncate">
                    {product.sales && product.sales.description}
                </span>
                <div className="mt-2 mb-5 flex items-end justify-center">
                    <StarRating rating={getRandomStar()} />
                    <span>{"(4)"}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;

import { useEffect, useState } from "react";
import { IconMinus, IconPlus, IconTrash } from "../icon/Icon";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import React from "react";
import { CartDetail } from "../../data/CartDetail";
import ImageCustom from "../Image/ImageCustom";
import { ProductItem } from "../../data/Product";
import classNames from "../../libs/utils/classNames";
import productApi from "../../libs/api/product.api";

type CartItemCardProps = {
    cartItem: ProductItem;
    quantityItem: number;
    handleUpdateCart: (cartItem: ProductItem, quantity: number) => void;
    handleRemoveFromCart: (id: string) => void;
    index: number;
    id?: string;
};
const CartItem = ({
    cartItem,
    quantityItem,
    handleUpdateCart,
    handleRemoveFromCart,
    index,
    id,
}: CartItemCardProps) => {
    // const { userInfo } = useAppSelector((state: RootState) => state.user);
    const [quantity, setQuantity] = useState(quantityItem);
    const [product, setProduct] = useState<ProductItem>(cartItem);

    const handleRemove = () => {
        console.log(id);

        if (id) {
            handleRemoveFromCart(id);
        }
    };

    const addProduct = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        handleUpdateCart(cartItem, newQuantity);
    };
    const minusProduct = () => {
        if (quantity === 1) {
            if (id) {
                handleRemoveFromCart(id);
            }
        }
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        handleUpdateCart(cartItem, newQuantity);
    };

    useEffect(() => {
        const getProductFromDB = async (id) => {
            await productApi.getProductItemById(id).then((res) => {
                setProduct(res.data);
            });
        };
        if (cartItem) {
            getProductFromDB(cartItem.id);
        }
    }, []);

    useEffect(() => {
        setQuantity(quantityItem);
    }, [quantityItem]);

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-12 items-center gap-x-4 p-3 w-full">
                <div className="w-20 h-20 col-span-2">
                    <ImageCustom
                        src={
                            // cartItem.product.images.length > 0
                            // ? cartItem.product.images[0].url
                            // : "https://readymadeui.com/images/product1.webp"
                            "https://readymadeui.com/images/product1.webp"
                        }
                        // alt={cartItem.product.productName}
                        alt={"Thanh Trong"}
                        rounded
                    />
                </div>
                <div className="col-span-5">
                    {/* <span className="mx-2">{cartItem.product.productName}</span> */}
                    <span className="mx-2">
                        {cartItem.product?.productName}
                    </span>
                </div>
                <div className="flex gap-2 col-span-2">
                    <div onClick={minusProduct}>
                        <IconMinus />
                    </div>
                    <span className="h-7 w-8 bg-gray-200 text-center items-center">
                        {quantity}
                    </span>
                    <button
                        onClick={addProduct}
                        className={classNames(
                            "",
                            quantity === product.stock
                                ? "text-gray-400 cursor-default"
                                : "cursor-pointer hover:text-green-500"
                        )}
                        disabled={quantity === product.stock}
                    >
                        <IconPlus />
                    </button>
                </div>
                <div className="col-span-2">
                    <span>
                        {(
                            (cartItem.product?.promoPrice ?? 0) * quantity
                        ).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
                <div
                    onClick={handleRemove}
                    className="col-span-1 flex justify-end"
                >
                    <IconTrash />
                </div>
            </div>
        </div>
    );
};

export default CartItem;

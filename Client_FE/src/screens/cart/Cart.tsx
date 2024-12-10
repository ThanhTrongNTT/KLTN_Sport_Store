import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CartDetail } from "../../data/CartDetail";
import CartItem from "../../components/cart/CartItem";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import {
    CartItem as CartItemInterface,
    removeCart,
    updateCart,
} from "../../redux/slices/cartSlice";
import { ProductItem } from "../../data/Product";

const Cart = () => {
    const { userInfo } = useAppSelector((state: RootState) => state.user);
    const cart = useAppSelector((state: RootState) => state.cart.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    // useEffect(() => {
    //     if (userInfo.email === "") {
    //         navigate("/login");
    //     }
    // }, [userInfo, navigate]);

    const handleUpdateCart = (cartItem: ProductItem, quantity: number) => {
        dispatch(
            updateCart({
                productId: cartItem.id,
                quantity: quantity,
            })
        );
    };

    const handleRemoveFromCart = (id: string) => {
        console.log("id:", id);
        dispatch(removeCart(id));
        toast.success("Product removed from cart.", {
            autoClose: 1000,
            pauseOnHover: true,
            draggable: true,
            delay: 50,
        });
    };

    const handleSubTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice +=
                (item.productItem.product?.promoPrice ?? 0) * item.quantity;
        });
        setSubtotal(totalPrice);
        setTotal(totalPrice);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error("No product to checkout.", {
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                delay: 50,
            });
            return;
        }
        navigate("/order");
    };
    useEffect(() => {
        handleSubTotalPrice();
    }, [cart]);
    return (
        <div className="font-Roboto bg-gray-100 h-screen text-center">
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-3xl font-extrabold text-[#333]">
                    Giỏ hàng
                </h2>
                <div className="grid lg:grid-cols-2 gap-8 mt-10">
                    <div className="flex flex-col">
                        {cart.length > 0 ? (
                            cart.map(
                                (
                                    cartItem: CartItemInterface,
                                    index: number
                                ) => (
                                    <CartItem
                                        cartItem={cartItem.productItem}
                                        quantityItem={cartItem.quantity}
                                        // handleUpdateCart={handleUpdateCart}
                                        handleUpdateCart={handleUpdateCart}
                                        handleRemoveFromCart={
                                            handleRemoveFromCart
                                        }
                                        key={index}
                                        index={index}
                                        id={cartItem.productItem.id}
                                    />
                                )
                            )
                        ) : (
                            <span className="text-xl font-semibold">
                                Giỏ hàng của bạn đang trống.
                            </span>
                        )}
                    </div>
                    <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)]">
                        <h3 className="text-xl font-extrabold [#333] border-b pb-3">
                            Tóm tắt đơn hàng
                        </h3>
                        <ul className="text-[#333] text-sm divide-y mt-6">
                            <li className="flex flex-wrap gap-4 py-3">
                                <span>Tổng cộng</span>
                                <span className="ml-auto font-bold">
                                    {subtotal.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            </li>
                            <li className="flex flex-wrap gap-4 py-3">
                                <span>Phí vận chuyển</span>
                                <span className="ml-auto font-bold">
                                    Miễn phí
                                </span>
                            </li>
                            <li className="flex flex-wrap gap-4 py-3 font-bold">
                                <span>Tổng</span>
                                <span className="ml-auto">
                                    {total.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            </li>
                        </ul>
                        <button
                            type="button"
                            // disabled={carts.length === 0}
                            className={`mt-6 text-sm px-6 py-2.5 w-full bg-[#333] text-white rounded-md ${
                                cart.length === 0
                                    ? "bg-gray-400"
                                    : "hover:bg-[#111]"
                            }`}
                            onClick={handleCheckout}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

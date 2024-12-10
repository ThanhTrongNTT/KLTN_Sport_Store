import React, { useEffect, useState } from "react";
import Label from "../../components/label/Label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import orderApi, { OrderRequest } from "../../libs/api/order.api";
import { initOrder, Order, OrderItem } from "../../data/Order";
import { useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

const Payment = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userInfo } = useAppSelector((state: RootState) => state.user);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [orderWithItem, setOrderWithItem] = useState<OrderRequest>(
        JSON.parse(localStorage.getItem("order") ?? "{}")
    );
    const [order, setOrder] = useState<Order>(initOrder);

    const handleChange = (method: string) => {
        setPaymentMethod(method);
    };

    const handleOrderConfirm = async () => {
        console.log("Order: ", orderWithItem);

        orderWithItem.order.status = "PENDING";
        orderWithItem.order.paymentMethod = paymentMethod;
        // Save Order
        await orderApi.createOrder(orderWithItem).then((response) => {
            if (response.result) {
                console.log("Order created: ", response.data);
                setOrder(response.data);
                dispatch(clearCart());
            }
        });
        if (paymentMethod === "Momo") {
            await orderApi.paymentMomo(order).then((response) => {
                if (response.result) {
                    console.log("Redirect to Momo: ", response.data);
                    const data = JSON.parse(response.data);

                    window.location.href = data.payUrl;
                    localStorage.removeItem("order");
                }
            });
        } else {
            localStorage.removeItem("order");
            toast.success("Order has been created successfully.", {
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                delay: 50,
            });
            navigate("/profile", { replace: true });
        }
    };

    useEffect(() => {
        if (userInfo.id === "") {
            toast.error("You need to login to view this page.", {
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                delay: 50,
            });
            navigate("/login", { replace: true });
        } else {
            setLoading(false);
        }
    }, [navigate, userInfo]);
    if (loading) {
        return null;
    }
    return (
        <div className="flex justify-center h-screen">
            <div className="flex flex-col w-1/2 p-10 m-10">
                <Label
                    htmlFor=""
                    className="flex justify-center font-extrabold uppercase px-2 text-xl m-10"
                >
                    Phương thức thanh toán
                </Label>
                <div className="">
                    {/* Lựa chọn phương thức thanh toán */}
                    <div className="flex justify-between border border-b-gray-400">
                        {/* COD */}
                        <div className="items-center content-center flex justify-items-center p-10">
                            <input
                                id="radio-cod"
                                type="radio"
                                value="COD"
                                name="payment-method"
                                className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={paymentMethod === "COD"}
                                onChange={() => handleChange("COD")}
                            />
                            <label
                                htmlFor="radio-cod"
                                className="px-2 text-base font-normal"
                            >
                                Thanh toán khi giao hàng (COD)
                            </label>
                        </div>
                        {/* Momo */}
                        <div className="items-center content-center flex justify-items-center p-10">
                            <input
                                id="radio-momo"
                                type="radio"
                                value="Momo"
                                name="payment-method"
                                className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={paymentMethod === "Momo"}
                                onChange={() => handleChange("Momo")}
                            />
                            <label
                                htmlFor="radio-momo"
                                className="px-2 text-base font-normal"
                            >
                                Thanh toán bằng Momo
                            </label>
                        </div>
                    </div>

                    {/* Nội dung hiển thị dựa vào phương thức thanh toán */}
                    <div className="p-10 bg-gray-100 text-center items-center content-center">
                        {paymentMethod === "COD" && (
                            <p>
                                Cảm ơn bạn đã lựa chọn thanh toán khi giao hàng
                                (COD). Chúng tôi sẽ liên hệ để xác nhận đơn hàng
                                qua điện thoại.
                            </p>
                        )}
                        {paymentMethod === "Momo" && (
                            <p>
                                Bạn đã chọn thanh toán bằng Momo. Sau khi xác
                                nhận, bạn sẽ được chuyển hướng đến Momo để hoàn
                                tất giao dịch.
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-center p-10">
                    <button
                        className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
                        onClick={handleOrderConfirm}
                    >
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;

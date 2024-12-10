import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, useAppSelector } from "../../redux/store";
import orderApi from "../../libs/api/order.api";

const PaymentSuccess = () => {
    const location = useLocation();
    const orderId =
        new URLSearchParams(location.search)
            .get("orderId")
            ?.replace(/:/g, "-") || "";
    const resultCode =
        new URLSearchParams(location.search).get("resultCode") || "";
    const amount = new URLSearchParams(location.search).get("amount") || "";
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { userInfo } = useAppSelector((state: RootState) => state.user);
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
    }, [navigate]);
    useEffect(() => {
        if (orderId && resultCode) {
            orderApi.paidOrder(orderId).then((res) => {
                if (res.result) {
                    toast.success("Payment successful!", {
                        autoClose: 1000,
                        pauseOnHover: true,
                        draggable: true,
                        delay: 50,
                    });
                }
            });
        }
    }, [orderId, resultCode]);
    if (loading) {
        return null;
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-green-100">
                <h1 className="text-4xl font-bold mb-4 text-green-700">
                    Payment Successful!
                </h1>
                <p className="text-lg mb-8 text-green-600">
                    Your payment has been processed successfully.
                </p>
                {orderId && (
                    <div className="bg-white p-4 rounded shadow mb-6">
                        <p className="text-lg font-bold">Order ID: {orderId}</p>
                        <p className="text-lg">
                            Amount Paid:{" "}
                            {amount
                                ? parseInt(amount).toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                  })
                                : "N/A"}
                        </p>
                    </div>
                )}
                <Link
                    to="/"
                    className="hover:underline font-bold text-xl text-green-800 bg-white py-2 px-4 rounded shadow"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;

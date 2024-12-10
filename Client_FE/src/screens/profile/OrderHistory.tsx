import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Pagination } from "flowbite-react";

const OrderHistory = () => {
    const { userInfo } = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo.id === "") {
            navigate("/login");
        } else {
            setLoading(false);
        }
    }, [userInfo]);
    if (loading) {
        return null;
    }
    return (
        <div>
            <span className="font-semibold text-lg">Lịch sử đơn hàng</span>
            <div className="p-5">
                <div className="overflow-x-auto rounded-2xl border mx-4 border-gray-c4 ">
                    <table className="bg-white w-full text-sm text-left text-gray-400">
                        <thead>
                            <tr>
                                <th scope="col" className="p-3">
                                    Total Price
                                </th>
                                <th scope="col" className="p-3">
                                    Status
                                </th>
                                <th scope="col" className="p-3">
                                    Payment Method
                                </th>
                                <th scope="col" className="p-3">
                                    Is Paid
                                </th>
                                <th scope="col" className="p-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody>
                                {orders.map((order: Order, index) => {
                                    const currentStatus = STATUS_OPTIONS.find(
                                        (status) =>
                                            status.value === order.status
                                    );
                                    return (
                                        <tr
                                            className="bg-white border border-gray-c2 hover:bg-gray-c2 cursor-pointer"
                                            key={index}
                                        >
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                            >
                                                {order.id}
                                            </th>
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                            >
                                                {order.user?.userName}
                                            </th>
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium whitespace-nowrap"
                                            >
                                                {order.total?.toLocaleString(
                                                    "it-IT",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                )}
                                            </th>
                                            <th className="py-4 px-6 font-medium whitespace-nowrap">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            order.id ?? "",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-auto h-8 py-1 px-2 text-sm rounded-full border-none  text-white ${
                                                        currentStatus?.color ||
                                                        "bg-gray-400"
                                                    }`}
                                                >
                                                    {STATUS_OPTIONS.map(
                                                        (status) => (
                                                            <option
                                                                key={
                                                                    status.value
                                                                }
                                                                value={
                                                                    status.value
                                                                }
                                                            >
                                                                {status.label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </th>
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium whitespace-nowrap"
                                            >
                                                {order.paymentMethod}
                                            </th>
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium whitespace-nowrap"
                                            >
                                                {order.isPaid
                                                    ? "Paid"
                                                    : "Not Paid"}
                                            </th>
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                            >
                                                <div className="text-center">
                                                    <span
                                                        className="text-white hover:bg-white hover:text-black bg-success  rounded-lg px-2 mx-2"
                                                        onClick={() => {}}
                                                    >
                                                        Edit
                                                    </span>
                                                    <span
                                                        className="text-white bg-warning rounded-lg px-2 hover:bg-white hover:text-black mx-2"
                                                        onClick={() => {}}
                                                    >
                                                        Delete
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    );
                                })}
                            </tbody> */}
                    </table>
                </div>
            </div>
            <div className="flex justify-center">
                <Pagination
                    showIcons={true}
                    // currentPage={currentPage}
                    // totalPages={totalPages}
                    // onPageChange={onPageChange}
                    currentPage={1}
                    totalPages={0}
                    onPageChange={() => {}}
                    layout="pagination"
                />
            </div>
        </div>
    );
};

export default OrderHistory;

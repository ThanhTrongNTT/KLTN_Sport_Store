import OrderAPI from "@/api/order.api";
import { Order } from "@/data/Order.interface";
import { STATUS_OPTIONS } from "@/utils/Constant";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListOrder = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [orders, setOrders] = useState<Order[]>([]);
    const [modalView, setModalView] = useState(false);
    const [orderView, setOrderView] = useState<Order | null>(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getData = async () => {
        const response = await OrderAPI.getAllOrders(
            currentPage - 1,
            5,
            "modifiedDate",
            ""
        );
        if (response.result) {
            setOrders(response.data.items);
            setTotalPages(response.data.totalPages);
        }
    };

    const onClickView = (order: Order) => {
        setOrderView(order);
        setModalView(!modalView);
    };

    const onCloseView = () => {
        setModalView(!modalView);
    };
    const onCloseDelete = () => {
        setModalDelete(!modalDelete);
    };

    const handleDelete = async (id: string) => {
        await OrderAPI.deleteOrder(id).then((res) => {
            if (res.result) {
                toast.success("Delete Success!", {
                    autoClose: 5000,
                    delay: 50,
                    draggable: false,
                    pauseOnHover: false,
                });
            }
        });
        getData();
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await OrderAPI.updateOrderStatus(
                orderId,
                newStatus
            );
            if (response.result) {
                toast.success("Status updated successfully!", {
                    autoClose: 1000,
                    delay: 50,
                    draggable: false,
                    pauseOnHover: false,
                });
                getData();
            }
        } catch (error) {
            toast.error("Failed to update status!", {
                autoClose: 1000,
                delay: 50,
                draggable: false,
                pauseOnHover: false,
            });
        }
    };

    useEffect(() => {
        getData();
    }, [currentPage]);

    return (
        <>
            <div className="">
                <div className="p-5">
                    <div className="overflow-x-auto rounded-2xl border mx-4 border-gray-c4 ">
                        <table className="bg-white w-full text-sm text-left text-gray-400">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6">
                                        User Name
                                    </th>
                                    <th scope="col" className="px-6">
                                        Total Price
                                    </th>
                                    <th scope="col" className="px-6">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="px-6">
                                        Is Paid
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 text-center"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Pagination
                        showIcons={true}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        layout="pagination"
                    />
                </div>
            </div>
        </>
    );
};

export default ListOrder;

import couponAPI from "@/api/coupon.api";
import { IconAdd } from "@/components/icon/Icon";
import Modal from "@/components/modal/Modal";
import { Coupon, initCouponValue } from "@/data/Coupon.interface";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import NewCoupon from "../new/NewCoupon";
import DetailCoupon from "../detail/DetailCoupon";
import ModalDelete from "@/components/modal/ModalDelete";

const ListCoupon = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isNewModal, setIsNewModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [idDeleted, setIdDeleted] = useState<string>("");
    const [couponNew, setCouponNew] = useState<Coupon>(initCouponValue);
    const [coupon, setCoupon] = useState<Coupon>(initCouponValue);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getData = (page: number) => {
        couponAPI
            .getAllCoupon(page - 1, 5, "modifiedDate", "")
            .then((response) => {
                if (response) {
                    setTotalPage(response.data.totalPages);
                    setCoupons(response.data.items);
                }
            });
    };
    const handleCreateNew = (data: FieldValues) => {
        const newCoupon: Coupon = {
            code: data.code,
            description: data.description,
            discount: data.discount,
            startDate: data.startDate,
            endDate: data.endDate,
        };
        couponAPI.createCoupon(newCoupon).then((response) => {
            if (response.result) {
                onCloseNew();
                toast.success("Create Sale success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                getData(currentPage);
            }
        });
    };
    const onCloseNew = () => {
        setIsNewModal(!isNewModal);
    };

    const handleUpdate = (data: FieldValues) => {
        const updateCoupon: Coupon = {
            id: coupon.id,
            description: data.description,
            code: data.code,
            discount: data.discount,
            startDate: data.startDate,
            endDate: data.endDate,
        };

        couponAPI.updateCoupon(updateCoupon).then((response) => {
            if (response.result) {
                onCloseUpdate();
                toast.success("Update Success!", {
                    autoClose: 5000,
                    delay: 50,
                    draggable: true,
                    pauseOnHover: false,
                });
                getData(currentPage);
            }
        });
    };

    const onClickUpdate = (coupon: Coupon) => {
        setCoupon(coupon);
        setModalUpdate(!modalUpdate);
    };

    const onCloseUpdate = () => {
        setModalUpdate(!modalUpdate);
    };

    const handleDelete = async (id: string) => {
        setModalDelete(!modalDelete);
        await couponAPI.deleteCoupon(id).then((response) => {
            if (response && response.result) {
                toast.success("Delete Success!", {
                    autoClose: 5000,
                    delay: 50,
                    draggable: true,
                    pauseOnHover: false,
                });
                getData(currentPage);
            }
        });
    };

    const onCloseDelete = () => {
        setModalDelete(!modalDelete);
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);
    return (
        <>
            <Modal isVisible={isNewModal} onClose={onCloseNew}>
                <div>
                    <NewCoupon
                        handleCreateNew={handleCreateNew}
                        coupon={couponNew}
                        setCoupon={setCouponNew}
                    />
                </div>
            </Modal>
            <Modal isVisible={modalUpdate} onClose={onCloseUpdate}>
                <div>
                    <DetailCoupon handleUpdate={handleUpdate} coupon={coupon} />
                </div>
            </Modal>
            <Modal isVisible={modalDelete} onClose={onCloseDelete}>
                <ModalDelete
                    id={idDeleted}
                    handleDelete={handleDelete}
                    title={"Are you sure to delete this coupon?"}
                    onCloseDelModal={onCloseDelete}
                />
            </Modal>
            <div className="">
                <button
                    className="flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4"
                    onClick={onCloseNew}
                >
                    <IconAdd />
                    <span className="flex items-center mr-2">Thêm mới</span>
                </button>
            </div>
            <div className="">
                <div className="p-5">
                    <div className="overflow-x-auto rounded-2xl border mx-4 border-gray-c4 ">
                        <table className="bg-white w-full text-sm text-left text-gray-400">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Mã giảm giá
                                    </th>
                                    <th scope="col" className="px-6">
                                        Mô tả
                                    </th>
                                    <th scope="col" className="px-6">
                                        Giảm giá
                                    </th>
                                    <th scope="col" className="px-6">
                                        Ngày bắt đầu
                                    </th>
                                    <th scope="col" className="px-6">
                                        Ngày kết thúc
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
                                {coupons.map((coupon: Coupon, index) => (
                                    <tr
                                        className="bg-white border border-gray-c2 hover:bg-gray-c2 cursor-pointer"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {coupon.code}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black "
                                        >
                                            {coupon.description}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium whitespace-nowrap"
                                        >
                                            {coupon.discount + " %"}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {coupon.startDate?.toString()}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {coupon.endDate?.toString()}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            <div className="text-center">
                                                <span
                                                    className="text-white hover:bg-white hover:text-black bg-success  rounded-lg px-2 mx-2"
                                                    onClick={() =>
                                                        onClickUpdate(coupon)
                                                    }
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    className="text-white bg-warning rounded-lg px-2 hover:bg-white hover:text-black mx-2"
                                                    onClick={() => {
                                                        setIdDeleted(
                                                            coupon.id ?? ""
                                                        );
                                                        onCloseDelete();
                                                    }}
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Pagination
                        showIcons={true}
                        currentPage={currentPage}
                        totalPages={totalPage}
                        onPageChange={onPageChange}
                        layout="pagination"
                    />
                </div>
            </div>
        </>
    );
};

export default ListCoupon;

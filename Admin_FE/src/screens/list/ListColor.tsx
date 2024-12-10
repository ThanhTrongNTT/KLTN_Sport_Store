import colorAPI from "@/api/color.api";
import { IconAdd } from "@/components/icon/Icon";
import Modal from "@/components/modal/Modal";
import { Color, initColor } from "@/data/Product.interface";
import classNames from "@/utils/classNames";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import NewColor from "../new/NewColor";
import DetailColor from "../detail/DetailColor";
import ModalDelete from "@/components/modal/ModalDelete";

const ListColor = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [colors, setColors] = useState<Color[]>([]);
    const [modalNew, setModalNew] = useState(false);
    const [colorNew, setColorNew] = useState<Color>(initColor);
    const [modalEdit, setModalEdit] = useState(false);
    const [color, setColor] = useState<Color>(initColor);
    const [modalDelete, setModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState<string>("");

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getData = async () => {
        const response = await colorAPI.getAllColors(
            currentPage - 1,
            5,
            "modifiedDate",
            ""
        );
        if (response.result) {
            setColors(response.data.items);
            setTotalPage(response.data.totalPages);
        }
    };

    const onCloseNew = () => {
        setModalNew(!modalNew);
    };

    const handleCreateNew = (data: FieldValues) => {
        const colorNew: Color = {
            id: "",
            name: data.name,
            code: data.code,
            displayCode: data.displayCode,
        };

        colorAPI.createColor(colorNew).then((response) => {
            if (response.result) {
                onCloseNew();
                toast.success("Create success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                getData();
            }
        });
    };

    const handleUpdate = (data: FieldValues) => {
        const dataUpdate: Color = {
            id: color.id,
            name: data.name,
            code: data.code,
            displayCode: data.displayCode,
        };

        colorAPI.updateColor(dataUpdate).then((response) => {
            if (response.result) {
                onCloseUpdate();
                toast.success("Update Success!", {
                    autoClose: 5000,
                    delay: 50,
                    draggable: true,
                    pauseOnHover: false,
                });
                getData();
            }
        });
    };

    const onClickUpdate = (color: Color) => {
        setColor(color);
        setModalEdit(!modalEdit);
    };

    const onCloseUpdate = () => {
        setModalEdit(!modalEdit);
    };

    const handleDelete = async (id: string) => {
        setModalDelete(!modalDelete);
        await colorAPI.deleteColor(id).then((response) => {
            if (response && response.result) {
                toast.success("Delete Success!", {
                    autoClose: 5000,
                    delay: 50,
                    draggable: true,
                    pauseOnHover: false,
                });
                getData();
            }
        });
    };

    const onCloseDelete = () => {
        setModalDelete(!modalDelete);
    };

    useEffect(() => {
        getData();
    }, [currentPage]);

    return (
        <>
            <Modal isVisible={modalNew} onClose={onCloseNew}>
                <div>
                    <NewColor
                        handleCreateNew={handleCreateNew}
                        color={colorNew}
                        setColor={setColorNew}
                    />
                </div>
            </Modal>
            <Modal isVisible={modalEdit} onClose={onCloseUpdate}>
                <div>
                    <DetailColor handleUpdate={handleUpdate} color={color} />
                </div>
            </Modal>
            <Modal isVisible={modalDelete} onClose={onCloseDelete}>
                <ModalDelete
                    id={idDelete}
                    handleDelete={handleDelete}
                    title={"Are you sure to delete this color?"}
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
                                        Tên màu
                                    </th>
                                    <th scope="col" className="px-6">
                                        Mã màu
                                    </th>
                                    <th scope="col" className="px-6">
                                        Mã hiển thị
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
                                {colors.map((color: Color, index) => (
                                    <tr
                                        className="bg-white border border-gray-c2 hover:bg-gray-c2 cursor-pointer"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {color.name}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-bold text-black whitespace-nowrap"
                                            style={{ color: color.code }}
                                        >
                                            {color.code?.toUpperCase()}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black "
                                        >
                                            {color.displayCode}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            <div className="text-center">
                                                <span
                                                    className="text-white hover:bg-white hover:text-black bg-success  rounded-lg px-2 mx-2"
                                                    onClick={() => {
                                                        onClickUpdate(color);
                                                    }}
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    className="text-white bg-warning rounded-lg px-2 hover:bg-white hover:text-black mx-2"
                                                    onClick={() => {
                                                        setIdDelete(
                                                            color.id ?? ""
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

export default ListColor;

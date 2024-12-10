import { IconAdd } from "@/components/icon/Icon";
import Modal from "@/components/modal/Modal";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import DetailCategory from "../detail/DetailCategory";
import NewCategory from "../new/NewCategory";
import ModalDelete from "@/components/modal/ModalDelete";
import CategoryAPI from "@/api/category.api";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { Category } from "@/data/Product.interface";

const ListCategory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isNewModal, setIsNewModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [idDeleted, setIdDeleted] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryNew, setCategoryNew] = useState<Category>({
        categoryName: "",
        level: 0,
        locale: "",
        parentCategory: null,
        // removalFlag: false,
    });
    const [category, setCategory] = useState<Category>({
        categoryName: "",
        level: 0,
        locale: "",
        parentCategory: null,
        // removalFlag: false,
    });

    const getData = async (page: number) => {
        await CategoryAPI.getAllFromLevel(
            1,
            page - 1,
            5,
            "modifiedDate",
            ""
        ).then((response) => {
            setTotalPage(response.data.totalPages);
            setCategories(response.data.items);
        });
    };

    const onCloseNew = () => {
        setIsNewModal(!isNewModal);
    };

    const handleCreateNew = (data: FieldValues) => {
        const categoryNew: Category = {
            categoryName: data.categoryName,
            locale: data.locale,
            level: 1,
            parentCategory: null,
            // removalFlag: false,
        };
        CategoryAPI.addCategory(categoryNew).then((response) => {
            if (response.data) {
                onCloseNew();
                toast.success("Create Category success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                getData(currentPage);
            }
        });
    };

    const onClickUpdate = (category: Category) => {
        setCategory(category);
        setModalUpdate(!modalUpdate);
    };
    const onCloseUpdate = () => {
        setModalUpdate(!modalUpdate);
    };

    const handleUpdate = (data: FieldValues) => {
        const categoryUpdate: Category = {
            ...category,
            categoryName: data.categoryName,
            locale: data.locale,
        };
        if (categoryUpdate.id) {
            CategoryAPI.updateCategory(categoryUpdate, categoryUpdate.id).then(
                (response) => {
                    if (response.result) {
                        onCloseUpdate();
                        toast.success("Update Category success!", {
                            autoClose: 1000,
                            pauseOnHover: false,
                            draggable: true,
                            delay: 50,
                        });
                        getData(currentPage);
                    }
                }
            );
        }
    };

    const onCloseDelete = () => {
        setModalDelete(!modalDelete);
    };

    const handleDelete = async (id: string) => {
        setModalDelete(!modalDelete);
        await CategoryAPI.deleteCategory(id).then((response) => {
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

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    return (
        <>
            <Modal isVisible={isNewModal} onClose={onCloseNew}>
                <div>
                    <NewCategory
                        handleCreateNew={handleCreateNew}
                        category={categoryNew}
                        setCategory={setCategoryNew}
                    />
                </div>
            </Modal>
            <Modal isVisible={modalUpdate} onClose={onCloseUpdate}>
                <div>
                    <DetailCategory
                        handleUpdate={handleUpdate}
                        category={category}
                    />
                </div>
            </Modal>
            <Modal isVisible={modalDelete} onClose={onCloseDelete}>
                <ModalDelete
                    id={idDeleted}
                    handleDelete={handleDelete}
                    title={"Bạn có thật sự muốn xóa không?"}
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
            <div className="p-5">
                <div className="overflow-x-auto rounded-2xl border mx-4 border-gray-c4 ">
                    <table className="bg-white w-full text-sm text-left text-gray-400">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Id
                                </th>
                                <th scope="col" className="px-6">
                                    Tên
                                </th>
                                <th scope="col" className="px-6">
                                    Tên hiển thị
                                </th>
                                <th scope="col" className="px-6 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category: Category, index) => (
                                <tr
                                    className="bg-white border border-gray-c2 hover:bg-gray-c2"
                                    key={index}
                                >
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                    >
                                        {category.id}
                                    </th>
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                    >
                                        {category.categoryName}
                                    </th>
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium whitespace-nowrap"
                                    >
                                        {category.locale}
                                    </th>
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                    >
                                        <div className="text-center">
                                            <span
                                                className="text-white hover:bg-white hover:text-black bg-success  rounded-lg px-2 mx-2"
                                                onClick={() =>
                                                    onClickUpdate(category)
                                                }
                                            >
                                                Edit
                                            </span>
                                            <span
                                                className="text-white bg-warning rounded-lg px-2 hover:bg-white hover:text-black mx-2"
                                                onClick={() => {
                                                    setIdDeleted(
                                                        category.id ?? ""
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
        </>
    );
};

export default ListCategory;

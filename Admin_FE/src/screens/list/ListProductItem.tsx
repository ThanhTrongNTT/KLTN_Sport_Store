import ProductAPI from "@/api/product.api";
import { IconAdd } from "@/components/icon/Icon";
import ImageCustom from "@/components/image/ImageCustom";
import { Image } from "@/data/Image.interface";
import {
    Color,
    initProduct,
    initProductItem,
    Product,
    ProductItem,
} from "@/data/Product.interface";
import { Avatar, Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as PaginationSwiper, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import colorAPI from "@/api/color.api";
import Modal from "@/components/modal/Modal";
import NewProductItem from "../new/NewProductItem";
import { FieldValues, get } from "react-hook-form";
import { toast } from "react-toastify";
import DetailProductItem from "../detail/DetailProductItem";
import ModalDelete from "@/components/modal/ModalDelete";

const ListProductItem = () => {
    const pathname = window.location.pathname;
    const slug = pathname.split("/").pop();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [product, setProduct] = useState<Product>(initProduct);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    const [modalNew, setModalNew] = useState(false);
    const [productItemNew, setProductItemNew] =
        useState<ProductItem>(initProductItem);
    const [modalEdit, setModalEdit] = useState(false);
    const [productItemEdit, setProductItemEdit] =
        useState<ProductItem>(initProductItem);
    const [modalDelete, setModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const getProductItems = async (id: string) => {
        if (id) {
            await ProductAPI.getProductItem(
                id,
                currentPage - 1,
                5,
                "modifiedDate",
                ""
            ).then((response) => {
                setProductItems(response.data.items);
                setTotalPage(response.data.totalPages);
            });
        }
    };
    const getData = () => {
        if (product.id) getProductItems(product.id);
    };
    const handleCreateNew = (data: FieldValues) => {
        const itemNew: ProductItem = {
            id: "",
            color: data.color,
            size: data.size,
            stock: data.stock,
            mainImage: null,
            product: product,
        };
        ProductAPI.createProductItem(itemNew).then((response) => {
            if (response.result) {
                toast.success("Create Product Item success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                onCloseNew();
                getData();
            }
        });
    };
    const onCloseNew = () => {
        setModalNew(!modalNew);
    };
    const handleUpdate = (data: FieldValues) => {
        const itemUpdate: ProductItem = {
            id: productItemEdit.id,
            color: data.color,
            size: data.size,
            stock: data.stock,
            mainImage: null,
            product: product,
        };
        ProductAPI.updateProductItem(itemUpdate).then((response) => {
            if (response.result) {
                toast.success("Update Product Item success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                onCloseEdit();
                getData();
            }
        });
    };
    const onCloseEdit = () => {
        setModalEdit(!modalEdit);
    };
    const onClickUpdate = (item: ProductItem) => {
        setProductItemEdit(item);
        setModalEdit(!modalEdit);
    };

    const handleDelete = async (id: string) => {
        setModalDelete(!modalDelete);
        await ProductAPI.deleteProductItem(id).then((response) => {
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

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        getData();
    }, [currentPage]);

    useEffect(() => {
        const getProduct = (slug: string) => {
            ProductAPI.getProductBySlug(slug).then(async (response) => {
                setProduct(response.data);
                if (response.data.id) getProductItems(response.data.id);
            });
        };
        if (slug) getProduct(slug);
        const getColors = () => {
            colorAPI.getListColors().then((response) => {
                if (response.result) setColors(response.data);
            });
        };
        getColors();
    }, []);

    return (
        <>
            <Modal isVisible={modalNew} onClose={onCloseNew}>
                <div>
                    <NewProductItem
                        handleCreateNew={handleCreateNew}
                        productItem={productItemNew}
                        setProductItem={setProductItemNew}
                        colors={colors}
                    />
                </div>
            </Modal>
            <Modal isVisible={modalEdit} onClose={onCloseEdit}>
                <div>
                    <DetailProductItem
                        productItem={productItemEdit}
                        colors={colors}
                        handleUpdate={handleUpdate}
                    />
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
            {/* Show Product Information */}
            <div className="flex flex-col items-centers bg-white p-5 m-10 rounded-2xl">
                <div className="flex items-center justify-center p-5">
                    <h1 className="text-3xl font-bold">Product Information</h1>
                </div>
                <div className="w-1/2 mx-auto">
                    <Swiper
                        navigation={true}
                        pagination={{
                            type: "fraction",
                        }}
                        modules={[Navigation, PaginationSwiper]}
                        spaceBetween={50}
                        slidesPerView={3}
                    >
                        {/* {Array.from({ length: 5 }, (_, index) => index + 1).map(
                            (number) => (
                                <SwiperSlide>
                                    <ImageCustom
                                        key={number}
                                        alt={"Test"}
                                        className="h-48 w-48"
                                        src={
                                            "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                                        }
                                    />{" "}
                                </SwiperSlide>
                            )
                        )} */}
                        {product.subImages && product.subImages.length > 0 ? (
                            product.subImages.map((image: Image) => (
                                <SwiperSlide key={image.id}>
                                    <ImageCustom
                                        key={image.id}
                                        className="h-full w-full object-cover rounded-md"
                                        alt={
                                            image?.fileName
                                                ? image.fileName
                                                : ""
                                        }
                                        src={
                                            image.url ??
                                            "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                                        }
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <ImageCustom
                                    alt={"Test"}
                                    className="h-full w-full"
                                    src={
                                        "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                                    }
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className=" text-left">
                    <div className="p-5">
                        <div className="ml-5">
                            <h2 className="text-lg font-semibold">
                                {product.productName}
                            </h2>
                            <p className="text-gray-400">
                                {product.basePrice?.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </p>
                        </div>
                        <h2 className="text-lg font-semibold">
                            Long Description
                        </h2>
                        <p className="text-gray-400">
                            {product.longDescription}
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <button
                    className="flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4"
                    onClick={onCloseNew}
                >
                    <IconAdd />
                    <span className="flex items-center mr-2">Add New</span>
                </button>
            </div>
            <div className="">
                <h2 className="flex flex-col items-center font-bold text-2xl">
                    Product Items
                </h2>
                <div className="p-5">
                    <div className="overflow-x-auto rounded-2xl border mx-4 border-gray-c4 ">
                        <table className="bg-white w-full text-sm text-left text-gray-400">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3 px-6 ">
                                        Image
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Color
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Size
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Stock
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
                                {productItems.map((item) => (
                                    <tr
                                        className="bg-white border border-gray-c2 hover:bg-gray-c2 cursor-pointer"
                                        key={item.id}
                                    >
                                        <th
                                            scope="row"
                                            className="py-2 px-6 w-1/6"
                                        >
                                            <Avatar
                                                className="w-20"
                                                alt={"Test"}
                                                bordered
                                                size="lg"
                                                img={
                                                    "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                                                }
                                            />
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.color?.name}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.size}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.stock}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            <div className="text-center">
                                                <span
                                                    className="text-white hover:bg-white hover:text-black bg-success  rounded-lg px-2 mx-2"
                                                    onClick={() => {
                                                        onClickUpdate(item);
                                                    }}
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    className="text-white bg-warning rounded-lg px-2 hover:bg-white hover:text-black mx-2"
                                                    onClick={() => {
                                                        setIdDelete(
                                                            item.id ?? ""
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

                                {/* {productItems.map((item, index) => (
                                    <tr
                                        className="bg-white border border-gray-c2 hover:bg-gray-c2 cursor-pointer"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.mainImage.url}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.color.name}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.size.name}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.stock.quantity}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium whitespace-nowrap"
                                        >
                                            {item.basePrice.toLocaleString(
                                                "vi",
                                                {
                                                    style: "currency",
                                                    currency: "VND",
                                                }
                                            )}
                                        </th>
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-black whitespace-nowrap"
                                        >
                                            {item.sales.name}
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
                                                    View
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
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center pb-5 mb-5">
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

export default ListProductItem;

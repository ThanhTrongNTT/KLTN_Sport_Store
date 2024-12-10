import CategoryAPI from "@/api/category.api";
import ProductAPI from "@/api/product.api";
import { IconAdd } from "@/components/icon/Icon";
import ProductCard from "@/components/itemCard/productCard/ProductCard";
import Modal from "@/components/modal/Modal";
import ModalDelete from "@/components/modal/ModalDelete";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DetailProduct from "../detail/DetailProduct";
import NewProduct from "../new/NewProduct";
import { Category, initProduct, Product } from "@/data/Product.interface";
import ProductTable from "@/components/table/ProductTable";
import { Sale } from "@/data/Sale.interface";
import saleAPI from "@/api/sales.api";
import { FieldValues } from "react-hook-form";

const ListProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [genders, setGenders] = useState<Category[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);
    const [isNewModal, setIsNewModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [idDeleted, setIdDeleted] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [productEdit, setProductEdit] = useState<Product>(initProduct);
    // Fetch data ngay khi vào trang
    const getData = async (page: number) => {
        await ProductAPI.getAllProducts(page - 1, 5, "productName", "asc").then(
            (response) => {
                setProducts(response.data.items);
                setTotalPages(response.data.totalPages);
            }
        );
    };

    const onCloseNew = () => {
        setIsNewModal(!isNewModal);
    };

    const handleCreateNew = (product: Product) => {
        ProductAPI.addProduct(product).then((response) => {
            if (response.data) {
                onCloseNew();
                toast.success("Create Product success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                getData(currentPage);
            }
        });
    };

    const onClickUpdate = (product: Product) => {
        setProductEdit(product);
        setModalUpdate(!modalUpdate);
    };
    const onCloseUpdate = () => {
        setModalUpdate(!modalUpdate);
    };

    const handleUpdate = (data: FieldValues) => {
        const productUpdate = { ...data, id: productEdit.id };
        if (productEdit.id)
            ProductAPI.updateProduct(productUpdate, productEdit.id).then(
                (response) => {
                    if (response.data) {
                        onCloseUpdate();
                        toast.success("Update Product success!", {
                            autoClose: 1000,
                            pauseOnHover: false,
                            draggable: true,
                            delay: 50,
                        });
                        getData(currentPage);
                    }
                }
            );
    };

    const onCloseDelete = () => {
        setModalDelete(!modalDelete);
    };

    const handleDelete = (id: string) => {
        setModalDelete(!modalDelete);
        ProductAPI.deleteProduct(id).then((response) => {
            if (response.result) {
                toast.success("Delete Product success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                getData(currentPage);
            }
        });
    };

    // Thực hiện thay đổi khi có sự thay đổi trang
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const getDropDown = async () => {
            CategoryAPI.getCategoriesListByLevel(1).then((response) => {
                setGenders(response.data);
            });
            saleAPI.getListSales().then((response) => {
                setSales(response.data);
            });
        };
        getDropDown();
    }, []);

    return (
        <>
            <Modal isVisible={isNewModal} onClose={onCloseNew}>
                <div>
                    <NewProduct
                        handleCreateNew={handleCreateNew}
                        genders={genders}
                        sales={sales}
                    />
                </div>
            </Modal>

            <Modal isVisible={modalUpdate} onClose={onCloseUpdate}>
                <div>
                    <DetailProduct
                        product={productEdit}
                        handleUpdate={handleUpdate}
                        genders={genders}
                        sales={sales}
                    />
                </div>
            </Modal>
            <Modal isVisible={modalDelete} onClose={onCloseDelete}>
                <ModalDelete
                    id={idDeleted}
                    handleDelete={handleDelete}
                    title={"Are you sure to delete this product?"}
                    onCloseDelModal={onCloseDelete}
                />
            </Modal>
            <div className="">
                <button
                    className="flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4"
                    onClick={() => {
                        setIsNewModal(true);
                    }}
                >
                    <IconAdd />
                    <span className="flex items-center mr-2">Thêm mới</span>
                </button>
            </div>
            <div className="p-5">
                <div className="overflow-x-auto rounded-2xl border mx-4 border-gray-c4">
                    <ProductTable
                        products={products}
                        onCloseUpdate={onClickUpdate}
                        setIdDeleted={setIdDeleted}
                        onCloseDelete={onCloseDelete}
                    />
                    {/* {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onCloseEdit={onClickUpdate}
                                setIdDeleted={setIdDeleted}
                                onCloseDel={onCloseDelete}
                            />
                        ))} */}
                </div>
            </div>
            <div className="flex justify-center">
                <Pagination
                    showIcons={true}
                    layout="pagination"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );
};

export default ListProduct;

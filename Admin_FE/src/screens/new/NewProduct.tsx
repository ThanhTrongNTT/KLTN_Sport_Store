// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import CategoryAPI from "@/api/category.api";
import MediaFileAPI from "@/api/mediaFile.api";
import DropdownCategory from "@/components/dropdown/DropdownCategory";
import DropdownSale from "@/components/dropdown/DropdownSale";
import Field from "@/components/field/Field";
import { Image } from "@/data/Image.interface";
import { Category, initProduct, Product } from "@/data/Product.interface";
import { Sale } from "@/data/Sale.interface";
import classNames from "@/utils/classNames";
import { ProductSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, FieldValues, set, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface NewProductProps {
    handleCreateNew: (product: Product) => void;
    genders: Category[];
    sales: Sale[];
}

const NewProduct = ({ handleCreateNew, genders, sales }: NewProductProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm<Product>({
        resolver: yupResolver(ProductSchema),
        mode: "onSubmit",
        defaultValues: initProduct,
    });

    const [images, setImages] = useState<Array<File>>([]);
    const [disable, setDisable] = useState<boolean>(true);
    const [mediaFiles, setMediaFiles] = useState<Image[]>([]);

    const formValues = watch();

    const disableAdd = () => {
        return (
            formValues.productName === "" &&
            formValues.longDescription === "" &&
            formValues.freeInformation === "" &&
            formValues.washingInformation === "" &&
            formValues.slug === "" &&
            formValues.basePrice === 0 &&
            formValues.gender === null &&
            formValues.category === null
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                const newImage = e.target.files[i];
                setImages((images) => [...images, newImage]);
                const file = {
                    id: "",
                    fileName: newImage.name,
                    fileType: newImage.type,
                    url: "",
                };
                setMediaFiles((mediaFiles) => [...mediaFiles, file]);
            }
        }
    };

    const onSubmit = (data: FieldValues) => {
        console.log("data", data);
        setDisable(false);
        // const product: Product = {
        //     productName: data.productName,
        //     freeInformation: data.freeInformation,
        //     longDescription: data.washingInformation,
        //     washingInformation: data.washingInformation,
        //     slug: data.slug,
        //     price: data.price,
        //     gender: data.gender,
        //     category: data.category,
        //     subImages: mediaFiles,
        // };
        // handleCreateNew(product);
        // resetValues();
        setTimeout(() => {
            setDisable(true);
            handleCreateNew(data);
        }, 5000);
    };
    const uploadFiles = async () => {
        setDisable(false);
        // if (images.length === 0) {
        //     toast.error("Please choose your images", {
        //         autoClose: 1000,
        //         pauseOnHover: false,
        //         draggable: true,
        //         delay: 50,
        //     });
        //     setDisable(true);
        //     return;
        // }
        // await MediaFileAPI.uploadFiles(images).then((response) => {
        //     if (response.data) {
        //         setImages([]);
        //         toast.success("Upload success", {
        //             autoClose: 1000,
        //             pauseOnHover: false,
        //             draggable: true,
        //             delay: 50,
        //         });
        //         setDisable(true);
        //         setMediaFiles(response.data);
        //     }
        //     setDisable(true);
        // });
        setTimeout(() => {
            setDisable(true);
            setImages([]);
        }, 5000);
    };

    const resetValues = () => {
        reset(initProduct);
    };

    useEffect(() => {
        setValue("subImages", mediaFiles);
    }, [mediaFiles, setValue]);

    useEffect(() => {
        if (errors.gender) {
            toast.error(errors.gender.message, {
                autoClose: 1000,
                pauseOnHover: false,
                draggable: true,
                delay: 50,
            });
        } else if (errors.productName) {
            toast.error(errors.productName.message, {
                autoClose: 1000,
                pauseOnHover: false,
                draggable: true,
                delay: 50,
            });
        } else {
            const arrErrors = Object.values(errors);
            if (arrErrors.length > 0) {
                if (arrErrors[0]?.message) {
                    const message = arrErrors[0]?.message;
                    toast.error(message.toString(), {
                        autoClose: 1000,
                        pauseOnHover: false,
                        draggable: true,
                        delay: 50,
                    });
                }
            }
        }
    }, [errors]);
    const gender = watch("gender");
    useEffect(() => {
        if (gender && gender.id !== "") {
            if (gender.id) {
                CategoryAPI.getChildCategory(gender.id).then((response) => {
                    if (response.data) {
                        setCategories(response.data);
                    }
                });
            }
        }
    }, [gender]);
    return (
        <div className="w-[1000px]">
            <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-bold text-2xl flex justify-center">
                        Thêm mới sản phẩm
                    </h1>
                    <div className="text-right mt-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Tên sản phẩm{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="productName"
                                    id="product-name"
                                    placeholder="Nhập tên sản phẩm..."
                                    error={errors.productName?.message ?? ""}
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Mô tả{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="longDescription"
                                    id="long-description"
                                    placeholder="Nhập mô tả của sản phẩm..."
                                    error={
                                        errors.longDescription?.message ?? ""
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Thông tin cơ bản{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="freeInformation"
                                    id="product-name"
                                    placeholder="Nhập thông tin cơ bản của sản phẩm..."
                                    error={
                                        errors.freeInformation?.message ?? ""
                                    }
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Slug{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="slug"
                                    id="product-slug"
                                    placeholder="Nhập Slug..."
                                    error={errors.slug?.message ?? ""}
                                    // onChange={(
                                    //     e: ChangeEvent<HTMLInputElement>
                                    // ) =>
                                    //     setProduct({
                                    //         ...product,
                                    //         slug: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mt-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Giá{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="basePrice"
                                    id="basePrice"
                                    placeholder="Nhập giá cơ bản..."
                                    type="number"
                                    error={errors.basePrice?.message ?? ""}
                                    // onChange={(
                                    //     e: ChangeEvent<HTMLInputElement>
                                    // ) => {
                                    //     setProduct({
                                    //         ...product,
                                    //         basePrice: parseInt(e.target.value),
                                    //     });
                                    // }}
                                >
                                    Price
                                </Field>
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Thông tin giặt giũ{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="washingInformation"
                                    id="quantity"
                                    placeholder="Nhập thông tin về giặt giũ..."
                                    error={
                                        errors.washingInformation?.message ?? ""
                                    }
                                    // onChange={(
                                    //     e: ChangeEvent<HTMLInputElement>
                                    // ) =>
                                    //     setProduct({
                                    //         ...product,
                                    //         washingInformation: e.target.value,
                                    //     })
                                    // }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mt-10">
                            <div className="flex flex-col gap-2 text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Giới tính{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                {/* <Dropdown
                                    className=""
                                    control={control}
                                    setValue={setValue}
                                    dropdownLabel="Select Size"
                                    name="size"
                                    list={getSizeNames()}
                                /> */}
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <DropdownCategory
                                            field={field}
                                            dropdownLabel={"Lựa chọn giới tính"}
                                            list={genders}
                                            error={errors.gender?.message ?? ""}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-2 text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Loại sản phẩm{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                {/* <Dropdown
                                    className=""
                                    control={control}
                                    setValue={setValue}
                                    dropdownLabel="Select category"
                                    name="category"
                                    list={getCategoryNames()}
                                /> */}
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <DropdownCategory
                                            field={field}
                                            dropdownLabel={"lựa chọn phân loại"}
                                            list={categories}
                                            error={
                                                errors.category?.message ?? ""
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mt-10">
                            <div className="flex flex-col gap-2 text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Khuyến mãi
                                </label>
                                <Controller
                                    name="sales"
                                    control={control}
                                    render={({ field }) => (
                                        <DropdownSale
                                            field={field}
                                            dropdownLabel={
                                                "lựa chọn khuyến mãi"
                                            }
                                            list={sales}
                                            error={errors.sales?.message ?? ""}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="mt-10 text-left items-center">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="file_input"
                            >
                                Upload file{" "}
                                <span className="text-red-500">
                                    (* Cần có ít nhất 1 ảnh của sản phẩm)
                                </span>
                            </label>
                            <div className="flex">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleChange}
                                    className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:h-full file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                                />
                                {/* <button
                                    type="button"
                                    onClick={uploadFiles}
                                    className={classNames(
                                        "ml-4 h-12 w-[130px] rounded-md text-white font-semibold",
                                        images.length === 0
                                            ? "cursor-no-drop bg-gradient-to-br from-orange-200 to-pink-200"
                                            : disable
                                              ? "bg-gradient-to-br from-orange-500 to-pink-500"
                                              : "cursor-wait bg-gradient-to-br from-orange-500 to-pink-500"
                                    )}
                                    disabled={images.length === 0}
                                >
                                    
                                </button> */}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={
                                (classNames(
                                    "ml-4 h-12 w-[130px] rounded-md text-white font-semibold"
                                ),
                                images.length === 0
                                    ? "cursor-no-drop bg-gradient-to-br from-orange-200 to-pink-200"
                                    : disable
                                      ? "bg-gradient-to-br from-orange-500 to-pink-500"
                                      : "cursor-wait bg-gradient-to-br from-orange-500 to-pink-500")
                            }
                        ></button>
                        <button
                            type="submit"
                            className={classNames(
                                "mt-4 ml-4 h-12 w-[130px] rounded-md text-white font-semibold",
                                disableAdd()
                                    ? "cursor-no-drop bg-gradient-to-br from-orange-200 to-pink-200"
                                    : disable
                                      ? "bg-gradient-to-br from-orange-500 to-pink-500"
                                      : "cursor-wait bg-gradient-to-br from-orange-500 to-pink-500"
                            )}
                            disabled={disableAdd()}
                        >
                            {disableAdd() ? (
                                "Thêm mới"
                            ) : disable ? (
                                "Thêm mới"
                            ) : (
                                <div className="flex items-center justify-center">
                                    <div className="w-7 h-7 bg-transparent border-[3px] border-t-[3px] border-t-transparent animate-spin border-white rounded-full"></div>
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProduct;

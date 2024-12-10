import DropdownColor from "@/components/dropdown/DropdownColor";
import DropdownSize from "@/components/dropdown/DropdownSize";
import Field from "@/components/field/Field";
import { Color, ProductItem } from "@/data/Product.interface";
import classNames from "@/utils/classNames";
import { productItemSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface DetailProductItemProps {
    colors: Color[];
    productItem: ProductItem;
    handleUpdate: (data: FieldValues) => void;
}
const sizes = ["S", "M", "L", "XL", "XXL"];
const DetailProductItem = ({
    colors,
    productItem,
    handleUpdate,
}: DetailProductItemProps) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
    } = useForm<ProductItem>({
        resolver: yupResolver(productItemSchema),
        mode: "onSubmit",
        defaultValues: {
            color: productItem.color,
            size: productItem.size,
            stock: productItem.stock,
            mainImage: productItem.mainImage,
            product: productItem.product,
        },
    });

    const submit = async (data: FieldValues) => {
        await handleUpdate(data);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);

        if (file) {
            setImage(file);
            setIsDisabled(false);
        } else {
            setImage(null);
            setIsDisabled(true);
        }
    };

    const uploadFiles = async () => {
        if (!image) return;
        setIsUploading(true);
        setIsDisabled(false);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Upload success", {
                autoClose: 1000,
                pauseOnHover: false,
                draggable: true,
                delay: 50,
            });
            const file = {
                name: image.name,
                url: URL.createObjectURL(image),
                type: image.type,
                id: "",
            };
            setValue("mainImage", file);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
            setIsDisabled(true);
            setImage(null);
        }
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
    };

    const formValues = watch();
    const disable = () => {
        console.log(formValues);

        console.log(productItem);

        return (
            formValues.color?.name === productItem.color?.name &&
            formValues.size === productItem.size &&
            formValues.stock === productItem.stock &&
            formValues.mainImage === productItem.mainImage
        );
    };
    useEffect(() => {
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
    }, [errors]);

    useEffect(() => {
        console.log(disable());
    }, []);
    return (
        <div>
            <div className="w-[800px]">
                <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <form onSubmit={handleSubmit(submit)}>
                        <h1 className="font-bold text-2xl text-center">
                            Thông tin sản phẩm con
                        </h1>
                        <div className="text-right mt-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="text-left">
                                    <label
                                        htmlFor=""
                                        className="text-lg font-semibold text-left"
                                    >
                                        Màu sắc{" "}
                                        <span className="text-red-500">
                                            (*)
                                        </span>
                                    </label>
                                    <Controller
                                        name="color"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownColor
                                                field={field}
                                                dropdownLabel={
                                                    "Lựa chọn màu sắc"
                                                }
                                                list={colors}
                                                error={
                                                    errors.color?.message ?? ""
                                                }
                                            />
                                        )}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor=""
                                        className="text-lg font-semibold text-left"
                                    >
                                        Kích cỡ{" "}
                                        <span className="text-red-500">
                                            (*)
                                        </span>
                                    </label>
                                    <Controller
                                        name="size"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownSize
                                                field={field}
                                                dropdownLabel={
                                                    "Lựa chọn kích cỡ"
                                                }
                                                list={sizes}
                                                error={
                                                    errors.size?.message ?? ""
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="text-left">
                                    <label
                                        htmlFor=""
                                        className="text-lg font-semibold text-left"
                                    >
                                        Số lượng{" "}
                                        <span className="text-red-500">
                                            (*)
                                        </span>
                                    </label>
                                    <Field
                                        control={control}
                                        type="number"
                                        name="stock"
                                        id="productItem-stock"
                                        placeholder="Nhập số lượng..."
                                        error={errors.stock?.message ?? ""}
                                    />
                                </div>
                            </div>
                            <div className="mt-10 text-left items-center">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="file_input"
                                >
                                    Ảnh chính
                                </label>
                                <div className="flex">
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:h-full file:border-0 file:py-2 file:px-4 file:mr-4 file:-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={uploadFiles}
                                        className={classNames(
                                            "ml-4 h-12 w-[130px] rounded-md text-white font-semibold transition-all",
                                            isDisabled
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : isUploading
                                                  ? "cursor-wait bg-gradient-to-br from-orange-400 to-pink-400"
                                                  : "bg-gradient-to-br from-orange-500 to-pink-500 hover:brightness-105"
                                        )}
                                        disabled={isDisabled}
                                    >
                                        {isUploading ? (
                                            <span className="flex items-center justify-center space-x-2">
                                                <svg
                                                    className="w-5 h-5 animate-spin text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                    ></path>
                                                </svg>
                                            </span>
                                        ) : (
                                            "Tải ảnh"
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={classNames(
                                    "mt-10 font-semibold px-4 py-2 rounded-md inline-block transition-all",
                                    disable()
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "text-white bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 cursor-pointer"
                                )}
                                disabled={disable()}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailProductItem;

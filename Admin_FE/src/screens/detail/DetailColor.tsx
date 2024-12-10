import Field from "@/components/field/Field";
import { Color } from "@/data/Product.interface";
import classNames from "@/utils/classNames";
import { colorSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface DetailColorProps {
    color: Color;
    handleUpdate: (data: FieldValues) => void;
}

const DetailColor = ({ color, handleUpdate }: DetailColorProps) => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
    } = useForm<Color>({
        resolver: yupResolver(colorSchema),
        mode: "onSubmit",
        defaultValues: {
            name: color.name,
            code: color.code,
            displayCode: color.displayCode,
        },
    });
    const submit = async (data: FieldValues) => {
        await handleUpdate(data);
    };
    const onChangeColor = (colorCode: string) => {
        setValue("code", colorCode);
    };

    const formValues = watch();
    const disable = () => {
        return (
            formValues.name === color.name &&
            formValues.code === color.code &&
            formValues.displayCode === color.displayCode
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

    return (
        <div className="w-[800px]">
            <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(submit)}>
                    <h1 className="font-bold text-2xl text-center">
                        Thông tin màu
                    </h1>
                    <div className="text-right mt-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Tên màu{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="name"
                                    id="color-name"
                                    placeholder="Nhập tên màu..."
                                    error={errors.name?.message ?? ""}
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Mã hiển thị{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="displayCode"
                                    id="color-displayCode"
                                    placeholder="Nhập mã hiển thị..."
                                    error={errors.displayCode?.message ?? ""}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <HexColorPicker
                                className="mt-5"
                                color={color.code}
                                onChange={onChangeColor}
                            />
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Mã màu{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="code"
                                    id="color-code"
                                    placeholder="Nhập mã màu..."
                                    error={errors.code?.message ?? ""}
                                    maxLength={7}
                                />
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
    );
};

export default DetailColor;

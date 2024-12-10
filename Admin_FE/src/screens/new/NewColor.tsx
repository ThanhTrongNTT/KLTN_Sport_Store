import Field from "@/components/field/Field";
import { Color, initColor } from "@/data/Product.interface";
import { colorSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { set } from "date-fns";
import React, { ChangeEvent, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface NewColorProps {
    color: Color;
    setColor: (color: Color) => void;
    handleCreateNew: (data: FieldValues) => void;
}
const NewColor = ({ color, setColor, handleCreateNew }: NewColorProps) => {
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<Color>({
        resolver: yupResolver(colorSchema),
        mode: "onSubmit",
        defaultValues: {
            name: color.name,
            code: color.code,
            displayCode: color.displayCode,
        },
    });

    const onChangeColor = (colorCode: string) => {
        setValue("code", colorCode);
        setColor({ ...color, code: colorCode });
    };

    const resetValues = () => {
        reset(initColor);
        setColor(initColor);
    };

    const submit = async (data: FieldValues) => {
        await handleCreateNew(data);
        resetValues();
    };

    useEffect(() => {
        reset({
            name: color.name,
            code: color.code,
            displayCode: color.displayCode,
        });
    }, [color, reset]);

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
                        Khởi tạo màu sắc
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setColor({
                                            ...color,
                                            name: e.target.value,
                                        })
                                    }
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setColor({
                                            ...color,
                                            displayCode: e.target.value,
                                        });
                                    }}
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setColor({
                                            ...color,
                                            code: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-10 font-semibold text-white bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-4 py-2 rounded-md inline-block transition-all"
                        >
                            Thêm mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewColor;

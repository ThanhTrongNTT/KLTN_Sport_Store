import Field from "@/components/field/Field";
import { Coupon, initCouponValue } from "@/data/Coupon.interface";
import { formatter } from "@/data/Sale.interface";
import { couponSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { Datepicker } from "flowbite-react";
import React, { ChangeEvent, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { parse } from "date-fns";

interface CouponProps {
    coupon: Coupon;
    setCoupon: (coupon: Coupon) => void;
    handleCreateNew: (data: FieldValues) => void;
}
const NewCoupon = ({ coupon, setCoupon, handleCreateNew }: CouponProps) => {
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<Coupon>({
        resolver: yupResolver(couponSchema),
        mode: "onSubmit",
        defaultValues: {
            description: coupon.description,
            code: coupon.code,
            discount: coupon.discount,
            startDate: coupon.startDate,
            endDate: coupon.endDate,
        },
    });
    const resetValues = () => {
        reset(initCouponValue);
        setCoupon(initCouponValue);
    };

    useEffect(() => {
        reset({
            description: coupon.description,
            code: coupon.code,
            discount: coupon.discount,
            startDate: coupon.startDate,
            endDate: coupon.endDate,
        });
    }, [coupon, reset]);

    const submit = async (data: FieldValues) => {
        if (data.startDate && data.endDate) {
            if (data.startDate >= data.endDate) {
                toast.error("End date must be greater than start date", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                return;
            }
        }
        console.log(data);
        await handleCreateNew(data);
        resetValues();
    };

    const onStartDateChange = (date: Date | null) => {
        if (date) {
            console.log(formatter.format(date).replace(",", ""));

            setValue("startDate", formatter.format(date).replace(",", ""));
        }
    };

    const onEndDateChange = (date: Date | null) => {
        if (date) {
            console.log(formatter.format(date).replace(",", ""));
            setValue("endDate", formatter.format(date).replace(",", ""));
            console.log("get Value", getValues("endDate"));
        }
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
                        Thêm mới mã giảm giá
                    </h1>
                    <div className="text-right mt-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Mã giảm giá{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="code"
                                    id="coupon-code"
                                    placeholder="Nhập mã giảm giá..."
                                    error={errors.code?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setCoupon({
                                            ...coupon,
                                            code: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Giảm giá{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="discount"
                                    id="coupon-discount"
                                    type="number"
                                    placeholder="Nhập giảm giá..."
                                    error={errors.discount?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setCoupon({
                                            ...coupon,
                                            discount: parseInt(e.target.value),
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="">
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
                                    name="description"
                                    id="coupon-description"
                                    placeholder="Nhập mô tả..."
                                    error={errors.description?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setCoupon({
                                            ...coupon,
                                            description: e.target.value,
                                        })
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
                                    Ngày bắt đầu
                                </label>
                                {/* <Datepicker
                            autoHide={true}
                            onChange={onStartDateChange}
                        /> */}
                                <Controller
                                    name="startDate"
                                    control={control}
                                    // rules={{ required: "Date is required" }}
                                    render={({ field }) => (
                                        <Datepicker
                                            language="vi"
                                            value={
                                                field.value
                                                    ? parse(
                                                          field.value,
                                                          "dd/MM/yyyy HH:mm:ss",
                                                          new Date()
                                                      )
                                                    : null
                                            }
                                            onChange={onStartDateChange}
                                        />
                                    )}
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Ngày kết thúc
                                </label>
                                {/* <Datepicker
                            autoHide={true}
                            onChange={onStartDateChange}
                        /> */}
                                <Controller
                                    name="endDate"
                                    control={control}
                                    // rules={{ required: "Date is required" }}
                                    render={({ field }) => (
                                        <Datepicker
                                            language="vi"
                                            value={
                                                field.value
                                                    ? parse(
                                                          field.value,
                                                          "dd/MM/yyyy HH:mm:ss",
                                                          new Date()
                                                      )
                                                    : null
                                            }
                                            onChange={onEndDateChange}
                                        />
                                    )}
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

export default NewCoupon;

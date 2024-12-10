import Field from "@/components/field/Field";
import { Coupon } from "@/data/Coupon.interface";
import { formatter } from "@/data/Sale.interface";
import { couponSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { Datepicker } from "flowbite-react";
import React, { ChangeEvent } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { parse } from "date-fns";
import classNames from "@/utils/classNames";

interface DetailCouponProps {
    coupon: Coupon;
    handleUpdate: (data: FieldValues) => void;
}
const DetailCoupon = ({ coupon, handleUpdate }: DetailCouponProps) => {
    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
        watch,
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
        handleUpdate(data);
    };

    const onStartDateChange = (date: Date | null) => {
        if (date) {
            setValue("startDate", formatter.format(date).replace(",", ""));
        }
    };

    const onEndDateChange = (date: Date | null) => {
        if (date) {
            setValue("endDate", formatter.format(date).replace(",", ""));
        }
    };

    const formValues = watch();
    const disable = () => {
        return (
            formValues.code === coupon.code &&
            formValues.description === coupon.description &&
            formValues.discount === coupon.discount &&
            formValues.startDate === coupon.startDate &&
            formValues.endDate === coupon.endDate
        );
    };
    return (
        <div className="w-[800px]">
            <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(submit)}>
                    <h1 className="font-bold text-2xl text-center">
                        Thông tin mã giảm giá
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
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
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

export default DetailCoupon;

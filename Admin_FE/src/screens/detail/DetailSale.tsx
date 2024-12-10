import { formatter, Sale } from "@/data/Sale.interface";
import { saleSchema } from "@/utils/schema.resolver";
import React, { ChangeEvent, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Datepicker } from "flowbite-react";
import Field from "@/components/field/Field";
import { parse } from "date-fns";
import { toast } from "react-toastify";
import classNames from "@/utils/classNames";

interface DetailSaleProps {
    sale: Sale;
    handleUpdate: (data: FieldValues) => void;
}
const DetailSale = ({ sale, handleUpdate }: DetailSaleProps) => {
    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
        watch,
    } = useForm<Sale>({
        resolver: yupResolver(saleSchema),
        mode: "onSubmit",
        defaultValues: {
            name: sale.name,
            description: sale.description,
            code: sale.code,
            discount: sale.discount,
            startDate: sale.startDate,
            endDate: sale.endDate,
        },
    });

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

    const formValues = watch();
    const disable = () => {
        return (
            formValues.name === sale.name &&
            formValues.code === sale.code &&
            formValues.description === sale.description &&
            formValues.discount === sale.discount &&
            formValues.startDate === sale.startDate &&
            formValues.endDate === sale.endDate
        );
    };

    useEffect(() => {
        console.log("Start Date", getValues("startDate"));
        console.log("End Date", getValues("endDate"));
    }, []);

    return (
        <div className="w-[800px]">
            <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(submit)}>
                    <h1 className="font-bold text-2xl text-center">
                        Update Sale
                    </h1>
                    <div className="text-right mt-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Sale Name
                                </label>
                                <Field
                                    control={control}
                                    name="name"
                                    id="sale-name"
                                    placeholder="Enter Sale name..."
                                    error={errors.name?.message ?? ""}
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Description
                                </label>
                                <Field
                                    control={control}
                                    name="description"
                                    id="sale-description"
                                    placeholder="Enter Description..."
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
                                    Sale Code
                                </label>
                                <Field
                                    control={control}
                                    name="code"
                                    id="sale-code"
                                    placeholder="Enter Sale code..."
                                    error={errors.code?.message ?? ""}
                                />
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Discount
                                </label>
                                <Field
                                    control={control}
                                    name="discount"
                                    id="sale-discount"
                                    type="number"
                                    placeholder="Enter Discount..."
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
                                    Start Date
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
                                    End Date
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
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailSale;

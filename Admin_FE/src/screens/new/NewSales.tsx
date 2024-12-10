import Field from "@/components/field/Field";
import { formatter, initSaleValue, Sale } from "@/data/Sale.interface";
import { saleSchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { Datepicker } from "flowbite-react";
import { ChangeEvent, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { parse } from "date-fns";

interface NewSalesProps {
    sale: Sale;
    setSale: (sale: Sale) => void;
    handleCreateNew: (data: FieldValues) => void;
}

const NewSales = ({ handleCreateNew, sale, setSale }: NewSalesProps) => {
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        setValue,
        formState: { errors },
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

    const resetValues = () => {
        reset(initSaleValue);
        setSale(initSaleValue);
    };

    useEffect(() => {
        reset({
            name: sale.name,
            description: sale.description,
            code: sale.code,
            discount: sale.discount,
            startDate: sale.startDate,
            endDate: sale.endDate,
        });
    }, [sale, reset]);

    const submit = async (data: FieldValues) => {
        console.log(data);

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

    // Show error nếu có lỗi xảy ra
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
                        Thêm mới khuyến mãi
                    </h1>
                    <div className="text-right mt-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Tên{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="name"
                                    id="sale-name"
                                    placeholder="Nhập tên..."
                                    error={errors.name?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setSale({
                                            ...sale,
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
                                    Mô tả{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="description"
                                    id="sale-description"
                                    placeholder="Nhập mô tả..."
                                    error={errors.description?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setSale({
                                            ...sale,
                                            description: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Mã khuyến mãi{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="code"
                                    id="sale-code"
                                    placeholder="Nhập mã..."
                                    error={errors.code?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setSale({
                                            ...sale,
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
                                    Giảm{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="discount"
                                    id="sale-discount"
                                    type="number"
                                    placeholder="Nhập giảm..."
                                    error={errors.discount?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setSale({
                                            ...sale,
                                            discount: parseInt(e.target.value),
                                        });
                                    }}
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

export default NewSales;

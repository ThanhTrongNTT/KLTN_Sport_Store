import { yupResolver } from "@hookform/resolvers/yup";
import { Breadcrumb } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    District,
    Province,
    Ward,
    getDistricts,
    getProvinces,
    getWards,
} from "vietnam-provinces";
import DropdownAddress from "../../components/dropdown/DropdownAddress";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import { OrderRequest } from "../../libs/api/order.api";
import { OrderSchema } from "../../libs/utils/schema";
import { RootState, useAppSelector } from "../../redux/store";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const cart = useAppSelector((state: RootState) => state.cart.items);
    const { userInfo } = useAppSelector((state: RootState) => state.user);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(OrderSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            province: "",
            district: "",
            ward: "",
            address: "",
            note: "",
            coupon: "",
        },
    });

    // Address
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Province>();
    const [selectedDistrict, setSelectedDistrict] = useState<Province>();

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity: Province | undefined = provinces.find(
            (city) => city.name === e.target.value
        );
        setSelectedProvince(selectedCity);
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrict: District | undefined = districts.find(
            (district) => district.name === e.target.value
        );
        setSelectedDistrict(selectedDistrict);
    };
    useEffect(() => {
        if (selectedProvince) {
            setDistricts(getDistricts(selectedProvince.code));
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            setWards(getWards(selectedDistrict.code));
        }
    }, [selectedDistrict]);

    const handleCreateOrder = (data: FieldValues) => {
        const request: OrderRequest = {
            order: {
                productsCount: cart.length,
                note: "This is a test order",
                subTotal: subtotal,
                tax: 0,
                total: total,
                status: "Pending",
                paymentMethod: "COD",
                isPaid: false,
                user: userInfo,
                address: {
                    addressData: data.address,
                    province: data.province,
                    district: data.district,
                    ward: data.ward,
                    phone: data.phoneNumber,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                },
            },
            orderItems: cart.map((cartItem) => ({
                product: cartItem.productItem,
                quantity: cartItem.quantity,
                subTotal:
                    cartItem.quantity *
                    (cartItem.productItem.product?.promoPrice ?? 0),
            })),
        };
        return request;
    };
    const onSubmit = async (data: FieldValues) => {
        if (userInfo.id === "") {
            toast.warn("Please login to order", {
                autoClose: 1000,
                pauseOnHover: false,
                draggable: true,
                delay: 50,
            });
            // navigate("/login");
            return;
        }
        const newData = handleCreateOrder(data);
        console.log(newData);
        localStorage.setItem("order", JSON.stringify(newData));
        // await orderApi.createOrder(newData).then((res) => {
        //     if (res.result) {
        //         toast.success("Order successfully", {
        //             autoClose: 1000,
        //             pauseOnHover: false,
        //             draggable: true,
        //             delay: 50,
        //         });
        //     }
        // });
        navigate("/payment");
        console.log(data);
    };
    const handleSubTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice +=
                (item.productItem.product?.promoPrice ?? 0) * item.quantity;
        });
        setSubtotal(totalPrice);
        setTotal(totalPrice);
    };
    useEffect(() => {
        handleSubTotalPrice();
        setProvinces(getProvinces());
    }, []);

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
        <div className="p-10 w-3/4 text-center mx-auto">
            <h2 className="text-5xl font-bold text-center mb-5">Sport Store</h2>
            {/* <BreadCrumb /> */}
            <div className="flex justify-center flex-col laptop:flex-row ">
                <div className="laptop:w-3/4 text-center w-full">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <span className="font-bold">Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href={`/cart`}>
                            <span className="font-bold">Cart</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="font-bold">Checkout</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex gap-x-10 justify-center px-5"
                        >
                            <div className="laptop:w-2/3 form-input border-none flex flex-col gap-4 w-3/4">
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            First Name
                                        </Label>
                                        <Field
                                            control={control}
                                            name="firstName"
                                            id="first-name"
                                            placeholder="Enter First Name..."
                                            error={
                                                errors.firstName?.message ?? ""
                                            }
                                        >
                                            First Name
                                        </Field>
                                    </div>
                                    <div className="text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            Last Name
                                        </Label>
                                        <Field
                                            control={control}
                                            name="lastName"
                                            id="last-name"
                                            placeholder="Enter Last Name..."
                                            error={
                                                errors.lastName?.message ?? ""
                                            }
                                        >
                                            Last Name
                                        </Field>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            Email
                                        </Label>
                                        <Field
                                            control={control}
                                            name="email"
                                            id="email"
                                            placeholder="Enter email..."
                                            error={errors.email?.message ?? ""}
                                        >
                                            Email
                                        </Field>
                                    </div>
                                    <div className="text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            Phone Number
                                        </Label>
                                        <Field
                                            control={control}
                                            name="phoneNumber"
                                            id="phone-number"
                                            placeholder="Enter Phone number..."
                                            error={
                                                errors.phoneNumber?.message ??
                                                ""
                                            }
                                        >
                                            Số điện thoại
                                        </Field>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-10">
                                    <div className="flex flex-col text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            Province
                                        </Label>
                                        <DropdownAddress
                                            className=""
                                            control={control}
                                            setValue={setValue}
                                            dropdownLabel="Select province"
                                            name="province"
                                            list={provinces}
                                            onChange={handleProvinceChange}
                                            error={
                                                errors.province?.message ?? ""
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            District
                                        </Label>
                                        <DropdownAddress
                                            onChange={handleDistrictChange}
                                            className=""
                                            control={control}
                                            setValue={setValue}
                                            dropdownLabel="Select district"
                                            name="district"
                                            list={districts}
                                            error={
                                                errors.district?.message ?? ""
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <Label
                                            htmlFor=""
                                            className="px-2 text-lg"
                                        >
                                            Ward
                                        </Label>
                                        <DropdownAddress
                                            onChange={() => {}}
                                            className=""
                                            control={control}
                                            setValue={setValue}
                                            dropdownLabel="Select ward"
                                            name="ward"
                                            list={wards}
                                            error={errors.ward?.message ?? ""}
                                        />
                                    </div>
                                </div>
                                <div className="text-left">
                                    <Label htmlFor="" className="px-2 text-lg">
                                        Address
                                    </Label>
                                    <Field
                                        control={control}
                                        name="address"
                                        id="address"
                                        placeholder="Enter Address..."
                                        error={errors.address?.message ?? ""}
                                    >
                                        Address
                                    </Field>
                                </div>
                                <div className="text-left">
                                    <Label htmlFor="" className="px-2 text-lg">
                                        Note
                                    </Label>
                                    <Controller
                                        name="note"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <textarea
                                                cols={90}
                                                rows={4}
                                                onChange={onChange}
                                                value={value}
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write your thoughts here..."
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="laptop:w-full laptop:mt-0 rounded p-5 w-1/3 bg-gray-100 mt-6 h-fit">
                                <span className=" flex justify-between gap-x-1 font-bold text-lg">
                                    <span>
                                        TỔNG ĐƠN HÀNG | {cart.length} SẢN PHẨM
                                    </span>
                                    <a
                                        className="hover:underline cursor-pointer"
                                        href="/cart"
                                    >
                                        SỬA
                                    </a>
                                </span>
                                <div>
                                    <div className="flex justify-between my-2">
                                        <span>Tổng cộng</span>
                                        <span>
                                            {subtotal.toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tiền ship</span>
                                        <span>
                                            {(0).toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg my-2">
                                        <span>Tổng đơn đặt hàng</span>
                                        <span>
                                            {/* {totalPrice.toLocaleString("en", { */}
                                            {total.toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <Label htmlFor="" className="px-2 text-lg">
                                        Coupon
                                    </Label>
                                    <Field
                                        control={control}
                                        name="coupon"
                                        id="coupon"
                                        placeholder="Enter Coupon..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-1/2 bg-blue-500 text-white p-2 rounded-md mt-5"
                                >
                                    Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

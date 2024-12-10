import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Input from "../../components/input/Input";
import AuthenticationApi from "../../libs/api/authentication.api";

const schame = Yup.object({
    email: Yup.string()
        .required("Please enter your emaill address!")
        .matches(
            // eslint-disable-next-line no-control-regex
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            { message: "Please enter valid email address" }
        ),
});

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schame),
        mode: "onSubmit",
    });
    const handleForgotPassword = async (data: FieldValues) => {
        await AuthenticationApi.forgotPassword(data.email)
            .then((res) => {
                if (res.result) {
                    toast.success(res.message, {
                        autoClose: 10000,
                        pauseOnHover: false,
                        draggable: true,
                        delay: 50,
                    });
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        reset();
    };
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            if (arrErrors[0].message) {
                const message = arrErrors[0].message;
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
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>
            <form
                className="space-y-4 w-1/3"
                onSubmit={handleSubmit(handleForgotPassword)}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <Input
                        variant={"outlined"}
                        control={control}
                        name="email"
                        type="email"
                        placeholder="Email"
                        error={errors.email?.message ?? ""}
                    />
                </div>
                <button
                    type="submit"
                    className="border-2 bg-cyan-300 border-white w-full text-white bg-primary-600 hover:bg-cyan-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:text-black hover:duration-500"
                >
                    Forgot Password
                </button>
            </form>
            <div className="flex items-center justify-between mt-10">
                <Link
                    to={"/login"}
                    className="text-xl font-medium text-black hover:text-cyan-300"
                >
                    Return login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;

import React, { useEffect } from "react";
import TogglePassword from "../../components/toggle/TogglePassword";
import Input from "../../components/input/Input";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import useToggleValue from "../../components/common/useToggleValue";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    ConfirmPasswordSchema,
    EmailSchema,
    PasswordSchema,
} from "../../libs/utils/schema";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Logo from "@assets/logo.png";
import AuthenticationApi from "../../libs/api/authentication.api";
import { User } from "../../data/User";

const schema = Yup.object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
    name: Yup.string().required("Please enter your name"),
});

const SignUpPage = () => {
    const navigate = useNavigate();
    const { value: showPassword, handleToggleValue: handleTogglePassword } =
        useToggleValue();
    const {
        value: showConfirmPassword,
        handleToggleValue: handleToggleConfirmPassword,
    } = useToggleValue();
    const {
        handleSubmit,
        control,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const handleRegister = async (data: FieldValues) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Confirm password does not match", {
                autoClose: 1000,
                pauseOnHover: false,
                draggable: true,
                delay: 50,
            });
            setFocus("confirmPassword");
            return;
        }
        const user: User = {
            email: data.email,
            password: data.password,
            userProfile: {
                name: data.name,
            },
        };
        await AuthenticationApi.register(user).then((res) => {
            if (res.result) {
                navigate("/login");
                toast.success(res.message, {
                    autoClose: 10000,
                    pauseOnHover: true,
                    draggable: true,
                    delay: 50,
                });
            }
        });
    };

    // Show error nếu có lỗi xảy ra
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-200 bg-banner-login bg-cover">
            <div className="w-full bg-white rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div
                        className="text-black flex justify-center font-bold text-2xl pt-5 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img
                            className="h-20 w-auto cursor-pointer"
                            src={Logo}
                            alt=""
                        />
                    </div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight pt-6 md:text-2xl text-black">
                        Create and account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit(handleRegister)}
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
                        <div>
                            <label
                                htmlFor="Name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your name
                            </label>
                            <Input
                                variant={"outlined"}
                                control={control}
                                name="name"
                                type="text"
                                placeholder="Name"
                                error={errors.name?.message ?? ""}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <Input
                                variant={"outlined"}
                                control={control}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                error={errors.password?.message ?? ""}
                            >
                                <TogglePassword
                                    open={showPassword}
                                    onClick={handleTogglePassword}
                                />
                            </Input>
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm Password
                            </label>
                            <Input
                                variant={"outlined"}
                                control={control}
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                error={errors.confirmPassword?.message ?? ""}
                            >
                                <TogglePassword
                                    open={showConfirmPassword}
                                    onClick={handleToggleConfirmPassword}
                                />
                            </Input>
                        </div>
                        <button
                            type="submit"
                            className="border-2 bg-cyan-300 border-white w-full text-white bg-primary-600 hover:bg-cyan-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:text-black hover:duration-500"
                        >
                            Create an account
                        </button>
                        <p className="text-sm font-light text-gray-400">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-medium text-primary-600 hover:underline text-primary-500"
                            >
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

import googleLogo from "@assets/google-logo.png";
import Logo from "@assets/logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useToggleValue from "../../components/common/useToggleValue";
import Input from "../../components/input/Input";
import TogglePassword from "../../components/toggle/TogglePassword";
import AuthenticationApi from "../../libs/api/authentication.api";
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "../../libs/utils/constants";
import { EmailSchema, PasswordSchema } from "../../libs/utils/schema";
import { useAppDispatch } from "../../redux/store";
import { JWTType } from "../../data/type.interface";
import { jwtDecode } from "jwt-decode";
import userApi from "../../libs/api/user.api";
import { update } from "../../redux/slices/userSlice";
import { User } from "../../data/User";
import { IconGithub } from "../../components/icon/Icon";

const schema = Yup.object({
    email: EmailSchema,
    password: PasswordSchema,
});

type LoginType = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const { value: showPassword, handleToggleValue: handleTogglePassword } =
        useToggleValue();
    const navigate = useNavigate();
    const handleLogin = async (values: LoginType) => {
        await AuthenticationApi.login(values.email, values.password)
            .then(async (res) => {
                Cookies.set("accessToken", res.data.accessToken);
                Cookies.set("refreshToken", res.data.refreshToken);
                const decode: JWTType = jwtDecode(res.data.accessToken || "");
                userApi
                    .getMe(decode.sub)
                    .then((res) => {
                        const userProfile: User = res.data;
                        dispatch(update(userProfile));
                    })
                    .catch((err) => {
                        toast.error(err.message, {
                            autoClose: 500,
                            delay: 10,
                            draggable: true,
                            pauseOnHover: false,
                            position: "bottom-right",
                        });
                    });
                toast.success("Login Success!", {
                    autoClose: 500,
                    delay: 10,
                    draggable: true,
                    pauseOnHover: true,
                });
                navigate("/");
                // dispatch(
                //     updateToken({
                //         accessToken: res.data.accessToken,
                //         refreshToken: res.data.refreshToken,
                //     })
                // );
                // await UserApi.getUserByEmail(values.email)
                //     .then((res) => {
                //         const userProfile: User = res.data;
                //         dispatch(update(userProfile));
                //         navigate("/");
                //         toast.success("Login Success!", {
                //             autoClose: 500,
                //             delay: 10,
                //             draggable: true,
                //             pauseOnHover: false,
                //         });
                //     })
                //     .catch((err) => {
                //         toast.error(err.message, {
                //             autoClose: 500,
                //             delay: 10,
                //             draggable: true,
                //             pauseOnHover: false,
                //         });
                //     });
            })
            .catch((err) => {
                if (err.status === 404) {
                    toast.error(`User does not existed!`, {
                        autoClose: 500,
                        delay: 10,
                        draggable: true,
                        pauseOnHover: false,
                    });
                }
            });
    };
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-200 bg-banner-login bg-cover shadow-2xl">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
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
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Log in to your account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit(handleLogin)}
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
                        <div className="flex items-center justify-between">
                            <Link
                                to={"/forgot-password"}
                                className="text-sm font-medium text-black hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="border-2 bg-cyan-300 border-white w-full text-white bg-primary-600 hover:bg-cyan-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 hover:text-black hover:duration-500"
                        >
                            Sign in
                        </button>

                        <p className="text-sm font-light text-gray-400">
                            Don’t have an account yet?{" "}
                            <a
                                href="/sign-up"
                                className="font-medium text-primary-600 hover:underline text-primary-500"
                            >
                                Sign up
                            </a>
                        </p>
                    </form>
                    <div className="flex flex-col mt-8 gap-y-4">
                        <a
                            className="hover:scale-110 ease-in-out duration-300 transition flex items-center justify-center gap-2 border border-gray-200 w-full py-3 mb-4 text-gray-800 font-bold text-sm uppercase bg-white rounded-lg shadow-md"
                            href={GOOGLE_AUTH_URL}
                        >
                            <img
                                src={googleLogo}
                                className="h-6 w-6"
                                alt="Google"
                            />{" "}
                            Log in with Google
                        </a>

                        <a
                            className="hover:scale-110 ease-in-out flex items-center justify-center w-full py-3 mb-4 text-white font-bold text-sm uppercase bg-gray-800 rounded-lg shadow-md transition duration-300"
                            href={GITHUB_AUTH_URL}
                        >
                            <IconGithub /> Log in with Github
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import Logo from "@assets/logo.png";
import React, { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import DropdownCart from "../dropdown/DropdownCart";
import Cookies from "js-cookie";
import AuthenticationApi from "../../libs/api/authentication.api";
import { toast } from "react-toastify";
import CategoryApi from "../../libs/api/category.api";
import { formatCategories } from "../../libs/utils/category";
import { Category } from "../../data/Categories";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { clearUser } from "../../redux/slices/userSlice";
import Tippy from "@tippyjs/react/headless";
import Menu from "../menu/Menu";
import { IconArrowDown } from "../icon/Icon";
import { Avatar } from "flowbite-react";
import classNames from "../../libs/utils/classNames";
// import Avatar from "../avatar/Avatar";

const items = [
    {
        id: 1,
        name: "T-shirt",
        price: 25.99,
        image: "https://readymadeui.com/images/product1.webp", // URL của ảnh sản phẩm
        quantity: 2, // Số lượng sản phẩm trong giỏ
    },
    {
        id: 2,
        name: "Jeans",
        price: 49.99,
        image: "https://readymadeui.com/images/product1.webp", // URL của ảnh sản phẩm
        quantity: 1,
    },
    {
        id: 3,
        name: "Sneakers",
        price: 75.99,
        image: "https://readymadeui.com/images/product1.webp", // URL của ảnh sản phẩm
        quantity: 1,
    },
    {
        id: 4,
        name: "Cap",
        price: 15.99,
        image: "https://readymadeui.com/images/product1.webp", // URL của ảnh sản phẩm
        quantity: 3,
    },
];

const Navbar = () => {
    const navigate = useNavigate();
    const cart = useAppSelector((state) => state.cart.items);
    const [isHovered, setIsHovered] = useState(false);
    const [isTippyVisible, setTippyVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [menu, setMenu] = useState<Category[]>([]);
    const { userInfo } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const fetchCategories = async () => {
        const res = await CategoryApi.getAllCategory();
        setMenu(formatCategories(res.data));
    };
    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log("Enter: ", searchText);
            setSearchText("");
        }
    };
    const handleLogout = () => {
        AuthenticationApi.logout().then(async (res) => {
            console.log(res);
            const allCookies = Cookies.get();
            dispatch(clearUser());
            Object.keys(allCookies).forEach((cookieName) => {
                Cookies.remove(cookieName, { path: "/" });
            });
            // await window.location.reload();
            toast.success("Logout success!", {
                autoClose: 1000,
                delay: 10,
                draggable: true,
                pauseOnHover: true,
            });
        });
    };

    const isLogin = Cookies.get("accessToken");

    const handleChangeSearch = (e: FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setSearchText(newValue);
        console.log("Current input: ", newValue);
    };
    useEffect(() => {
        const checkAccessToken = () => {
            return Cookies.get("accessToken") || "";
        };
        if (checkAccessToken() === "") {
            dispatch(clearUser());
        }
    }, []);
    useEffect(() => {
        fetchCategories();

        localStorage.removeItem("order");
    }, [isLogin]);
    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            {/* upper Navbar */}
            <div className="bg-primary/40 py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <a
                            href="/"
                            className="font-bold text-2xl sm:text-3xl flex gap-2"
                        >
                            <img src={Logo} alt="Logo" className="w-10" />
                            Sport Store
                        </a>
                    </div>

                    {/* search bar */}
                    <div className="flex justify-between items-center gap-4">
                        {/* order button */}
                        <div className="relative">
                            <button
                                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full items-center gap-3 flex group relative"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => navigate("/cart")}
                            >
                                {/* Icon giỏ hàng với badge số lượng sản phẩm */}
                                <div className="relative">
                                    <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
                                    <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                        {cart.length}
                                    </span>
                                </div>
                            </button>
                            {isHovered && <DropdownCart items={cart} />}
                        </div>
                        <div>{/* <DarkMode /> */}</div>
                        {!isLogin ? (
                            <div className="flex gap-5">
                                <Link to={"/login"}>
                                    <div className="text-lg font-medium text-gray-700 hover:text-gray-800 cursor-pointer">
                                        Đăng nhập
                                    </div>
                                </Link>
                                <span
                                    className="h-6 w-px bg-gray-400"
                                    aria-hidden="true"
                                ></span>
                                <Link to={"sign-up"}>
                                    <div className="text-lg font-medium text-gray-700 hover:text-gray-800 cursor-pointer pr-3">
                                        Tạo tài khoản
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex gap-5 justify-center items-center">
                                <Avatar
                                    img={
                                        userInfo?.userProfile?.avatar?.url ||
                                        "https://images.unsplash.com/photo-1441123694162-e54a981ceba5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    }
                                    rounded
                                    bordered
                                    alt="avatar"
                                />
                                <Tippy
                                    interactive
                                    delay={[0, 200]}
                                    offset={[0, 10]}
                                    onShow={() => setTippyVisible(true)}
                                    onHide={() => setTippyVisible(false)}
                                    // visible
                                    render={() => (
                                        <div
                                            className="w-[238px] rounded-2xl"
                                            tabIndex={-1}
                                        >
                                            <Menu handleLogout={handleLogout} />
                                        </div>
                                    )}
                                >
                                    <div className="flex items-center gap-2 cursor-pointer group p-2">
                                        <p className="">
                                            {userInfo?.userProfile?.name}
                                        </p>
                                        <span>
                                            <FaCaretDown
                                                className={classNames(
                                                    "transition-all duration-300",
                                                    isTippyVisible
                                                        ? "rotate-180"
                                                        : "rotate-0"
                                                )}
                                            />
                                        </span>
                                    </div>
                                </Tippy>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* lower Navbar */}
            <div data-aos="zoom-in" className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-4">
                    <li key={1} className="group relative cursor-pointer">
                        <a
                            href={"/KLTNShopsy"}
                            className="px-4 flex items-center"
                        >
                            Trang chủ
                        </a>
                    </li>
                    {menu.map((data) => (
                        <li
                            key={data.id}
                            className="group relative cursor-pointer"
                        >
                            <a
                                href={`/product?gender=${data.categoryName}`}
                                className="px-4 flex items-center"
                            >
                                {data.locale}
                                {data.children.length > 0 && (
                                    <span>
                                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                                    </span>
                                )}
                            </a>
                            {data.children.length > 0 && (
                                <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                                    <ul>
                                        {data.children.map((item) => (
                                            <li key={item.id}>
                                                <Link
                                                    to={`/product?gender=${data.categoryName}&category=${item.categoryName}`}
                                                    className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                                                >
                                                    {item.locale}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

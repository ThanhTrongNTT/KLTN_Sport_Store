import {
    IconProduct,
    IconCoupon,
    IconCategory,
    IconDashboard,
    IconOrder,
    IconSaleSideBar,
    IconUserSideBar,
    IconColor,
} from "@/components/icon/Icon";
import LogoDefault from "@/components/logo/LogoDefault";
import classNames from "@/utils/classNames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menus = [
    {
        title: "Dashboard",
        link: "/admin",
        icon: <IconDashboard />,
        isActive: true,
    },
    {
        title: "Người dùng",
        link: "user",
        icon: <IconUserSideBar />,
        isActive: false,
    },
    {
        title: "Sản phẩm",
        link: "product",
        icon: <IconProduct />,
        isActive: false,
    },
    {
        title: "Danh mục",
        link: "category",
        icon: <IconCategory />,
        isActive: false,
    },
    {
        title: "Khuyến mãi",
        link: "sale",
        icon: <IconSaleSideBar />,
        isActive: false,
    },
    {
        title: "Mã giảm giá",
        link: "coupon",
        icon: <IconCoupon />,
        isActive: false,
    },
    {
        title: "Màu sắc",
        link: "color",
        icon: <IconColor />,
        isActive: false,
    },
    { title: "Đơn hàng", link: "order", icon: <IconOrder />, isActive: false },
];
const SideBar = () => {
    const [menus, setMenus] = useState(Menus);
    const navigate = useNavigate();
    const handleMenuClick = (index: number) => {
        setMenus((prevMenus) =>
            prevMenus.map((menu, i) => {
                if (i === index) {
                    return { ...menu, isActive: !menu.isActive };
                }
                return { ...menu, isActive: false };
            })
        );
        navigate(menus[index].link);
    };
    return (
        <div className="bg-white h-fit rounded-xl m-4 w-20 lg:w-60 fixed top-0">
            <div className="flex justify-center p-10">
                <LogoDefault />
            </div>
            <hr className="mx-6 border-1.5 border-gray-c2" />
            <div className="px-6">
                <ul className="py-4">
                    {menus.map((menu, index) => (
                        <li
                            key={index}
                            className={classNames(
                                "text-black text-sm flex font-OpenSans items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-c2 rounded-md mt-2 justify-between",
                                menu.isActive ? "bg-gray-c2" : ""
                            )}
                            onClick={() => {
                                handleMenuClick(index);
                            }}
                        >
                            <div className="flex items-center gap-x-2">
                                <span className="text-2l block float-left">
                                    {menu.icon}
                                </span>
                                <span className="text-base font-OpenSans font-medium flex-1 duration-200">
                                    {menu.title}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;

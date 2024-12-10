import { Link } from "react-router-dom";
import React from "react";
import WrapperMenu from "./WrapperMenu";
import { IconLogout, IconMyProfile, IconOrderHistory } from "../icon/Icon";
import { RootState, useAppSelector } from "../../redux/store";

interface MenuProps {
    handleLogout: () => void;
}
const Menu = ({ handleLogout }: MenuProps) => {
    const { userInfo } = useAppSelector((state: RootState) => state.user);
    return (
        <WrapperMenu>
            <Link to={`/profile/${userInfo.email}`}>
                <div className="flex cursor-pointer items-center gap-5 px-5 py-4 text-[#23262F] transition-all hover:bg-[#16182308] dark:text-c7">
                    <span className="text-[#777E90] dark:text-c5">
                        <IconMyProfile />
                    </span>
                    <span className="p-1.5">User Profile</span>
                </div>
            </Link>
            {/* <Link to={`profile/order-history`}>
                <div className="flex cursor-pointer items-center gap-5 px-5 py-4 text-[#23262F] transition-all hover:bg-[#16182308] dark:text-c7">
                    <span className="text-[#777E90] dark:text-c5">
                        <IconOrderHistory />
                    </span>
                    <span className="p-1.5">Order History</span>
                </div>
            </Link> */}
            <div
                className="flex cursor-pointer items-center gap-5 px-5 py-4 text-[#23262F] transition-all hover:bg-[#16182308] dark:text-c7"
                onClick={handleLogout}
            >
                <span className="text-[#777E90] dark:text-c5">
                    <IconLogout />
                </span>
                <span className="p-1.5">Logout</span>
            </div>
        </WrapperMenu>
    );
};

export default Menu;

import { IconLogout, IconMyProfile } from "@/components/icon/Icon";
import WrapperMenu from "@/components/wrapper/WrapperMenu";
import { Link } from "react-router-dom";

interface MenuProps {
    handleLogout: () => void;
}
const Menu = ({ handleLogout }: MenuProps) => {
    return (
        <WrapperMenu>
            <Link to={"/profile"}>
                <div className="flex cursor-pointer items-center gap-5 px-5 py-4 text-[#23262F] transition-all hover:bg-[#16182308] dark:text-c7">
                    <span className="text-[#777E90] dark:text-c5">
                        <IconMyProfile />
                    </span>
                    <span className="p-1.5">User Profile</span>
                </div>
            </Link>
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

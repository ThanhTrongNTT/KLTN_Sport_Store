import Avt from "@/components/avt/Avt";
import { IconArrowDown } from "@/components/icon/Icon";
import { RootState } from "@/redux/store";
import { clearUser, resetUserState } from "@/redux/userSlice";
import Tippy from "@tippyjs/react/headless";
import queryString from "query-string";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "./menu/Menu";
import AuthAPI from "@/api/auth.api";

const Navbar = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const admin = queryString.parse(sessionStorage.getItem("admin") ?? "");
    const [isLogout, setIsLogout] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthAPI.logout();
        setIsLogout(true);
        sessionStorage.clear();
        dispatch(resetUserState());
        clearUser();
        toast.success(`Logout success!`, {
            autoClose: 500,
            delay: 10,
            draggable: true,
            pauseOnHover: false,
            position: "bottom-right",
        });
        navigate("/");
    };
    return (
        <>
            <div className="flex h-8 bg-transparent mt-3 justify-end">
                <div className="flex">
                    {admin && userInfo && !isLogout && (
                        <div className="flex items-center mx-5 gap-x-5">
                            <div className="flex items-center gap-2">
                                <Avt
                                    sx="default"
                                    src={
                                        userInfo?.userProfile?.avatar?.url ||
                                        "https://images.unsplash.com/photo-1441123694162-e54a981ceba5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    }
                                />
                                <div className="flex items-center">
                                    <p className="text-white">
                                        {userInfo?.userProfile?.name}
                                    </p>
                                    <Tippy
                                        interactive
                                        delay={[0, 200]}
                                        offset={[0, 10]}
                                        // visible
                                        render={() => (
                                            <div
                                                className="w-[238px] rounded-2xl"
                                                tabIndex={-1}
                                            >
                                                <Menu
                                                    handleLogout={handleLogout}
                                                />
                                            </div>
                                        )}
                                    >
                                        <span className="cursor-pointer px-2 py-4 text-white">
                                            <IconArrowDown />
                                        </span>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;

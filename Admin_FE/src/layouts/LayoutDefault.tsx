import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, SideBar } from "@/modules";

const LayoutDefault = () => {
    // const dispatch = useDispatch();
    // const accessToken = sessionStorage.getItem('accessToken');
    // const decode: JWTType = jwtDecode(accessToken ?? '');
    useEffect(() => {
        // userApi.getMe(decode.sub).then((response) => {
        //     dispatch(update(response));
        // });
    }, []);

    // const userProfile = userApi.getMe(decode.sub);

    // dispatch(update(userProfile));
    return (
        <div className="flex bg-transparent bg-repeat min-h-screen">
            <div className="flex-initial w-1/6">
                <SideBar />
            </div>
            <div className="flex flex-col w-5/6">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutDefault;

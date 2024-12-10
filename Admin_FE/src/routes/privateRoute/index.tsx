import { Navigate, Outlet } from "react-router-dom";
const useAuth = () => {
    const admin = sessionStorage.getItem("admin");
    return admin === "true" ? true : false;
};

const PrivateRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

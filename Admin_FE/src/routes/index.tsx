import Loading from "@/components/loading/Loading";
import LayoutDefault from "@/layouts/LayoutDefault";
import useLoadingStore from "@/redux/store/loadingStore";
import PrivateRoute from "@/routes/privateRoute";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/screens/home/Home"));
const ListCategory = lazy(() => import("@/screens/list/ListCategory"));
const ListOrder = lazy(() => import("@/screens/list/ListOrder"));
const ListProduct = lazy(() => import("@/screens/list/ListProduct"));
const ListUser = lazy(() => import("@/screens/list/ListUser"));
const Login = lazy(() => import("@/screens/login/Login"));
const NotFound = lazy(() => import("@/screens/notFound/NotFound"));
const ProfilePage = lazy(() => import("@/screens/profile/ProfilePage"));
const ListSale = lazy(() => import("@/screens/list/ListSale"));
const ListCoupon = lazy(() => import("@/screens/list/ListCoupon"));
const ListProductItem = lazy(() => import("@/screens/list/ListProductItem"));
const ListColor = lazy(() => import("@/screens/list/ListColor"));

const DeclareRouter = () => {
    return (
        <div className="bg-gradient-to-t from-orange-400 via-red-500 to-pink-500">
            {/* <div className="bg-banner-login bg-cover bg-fixed"> */}
            <Routes>
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="/login" element={<Login />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="/admin" element={<PrivateRoute />}>
                    <Route element={<LayoutDefault />}>
                        <Route path="" element={<Home />} />
                        <Route path="user">
                            <Route index element={<ListUser />} />
                        </Route>
                        <Route path="category">
                            <Route index element={<ListCategory />} />
                        </Route>
                        <Route path="order">
                            <Route index element={<ListOrder />} />
                        </Route>
                        <Route path="product">
                            <Route index element={<ListProduct />} />
                        </Route>
                        <Route path="product/detail/:slug">
                            <Route index element={<ListProductItem />} />
                        </Route>
                        <Route path="sale">
                            <Route index element={<ListSale />} />
                        </Route>
                        <Route path="coupon">
                            <Route index element={<ListCoupon />} />
                        </Route>
                        <Route path="color">
                            <Route index element={<ListColor />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default DeclareRouter;

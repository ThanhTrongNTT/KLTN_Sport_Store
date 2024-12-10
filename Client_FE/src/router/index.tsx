import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import useLoadingStore from "../redux/store/loading.store";
import Loading from "../components/loading/Loading";
const LayoutDefault = lazy(() => import("../layout/LayoutDefault"));
const HomePage = lazy(() => import("../screens/HomePage"));
const ProductPage = lazy(() => import("../screens/product/ProductPage"));
const DetailProductPage = lazy(
    () => import("../screens/product/DetailProductPage")
);
const NotFoundPage = lazy(() => import("../screens/NotFoundPage"));
const LoginPage = lazy(() => import("../screens/authentication/LoginPage"));
const SignUpPage = lazy(() => import("../screens/authentication/SignUpPage"));
const ProfilePage = lazy(() => import("../screens/profile/ProfilePage"));
const ForgotPassword = lazy(
    () => import("../screens/authentication/ForgotPassword")
);
const CheckoutPage = lazy(() => import("../screens/cart/CheckoutPage"));
const Cart = lazy(() => import("../screens/cart/Cart"));
const OrderHistory = lazy(() => import("../screens/profile/OrderHistory"));
const ChangePassword = lazy(() => import("../screens/profile/ChangePassword"));
const AboutPage = lazy(() => import("../screens/AboutPage"));
const Payment = lazy(() => import("../screens/cart/Payment"));
const PaymentSuccess = lazy(() => import("../screens/cart/PaymentSuccess"));

const Test = lazy(() => import("../screens/Test"));
const Test2 = lazy(() => import("../screens/Test2"));

const DeclareRouter = () => {
    const loading = useLoadingStore((state) => state.loading);
    return (
        <>
            {loading && <Loading />}
            <div className="font-Roboto">
                <Routes>
                    {/* Router of Login */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* Router of Register */}
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route element={<LayoutDefault />}>
                        {/* Router of Home */}
                        <Route path="/KLTNShopsy" element={<HomePage />} />
                        {/* Router of Product */}
                        <Route path="/product" element={<ProductPage />} />
                        {/* Router of Product Detail*/}
                        <Route
                            path="/product/:slug"
                            element={<DetailProductPage />}
                        />
                        {/* Router of Cart*/}
                        <Route path="/cart" element={<Cart />} />
                        {/* Router of Order*/}
                        <Route path="/order" element={<CheckoutPage />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route
                            path="/payment-success"
                            element={<PaymentSuccess />}
                        />
                        {/* Router of Profile*/}
                        <Route
                            path="/profile/:username"
                            element={<ProfilePage />}
                        />
                        {/* Router of Order History */}
                        <Route
                            path="/profile/order-history"
                            element={<OrderHistory />}
                        />
                        {/* Router of Change Password */}
                        <Route
                            path="/profile/change-password"
                            element={<ChangePassword />}
                        />
                        {/* Router of About Shop */}
                        <Route path="/about" element={<AboutPage />} />
                        {/* Router of Contact Shop */}
                    </Route>
                    {/* Router of NotFound*/}
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/test2" element={<Test2 />} />
                </Routes>
            </div>
        </>
    );
};
export default DeclareRouter;

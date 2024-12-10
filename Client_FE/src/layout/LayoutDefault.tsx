import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import React from "react";

const LayoutDefault = () => {
    const [orderPopup, setOrderPopup] = useState(false);
    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default LayoutDefault;

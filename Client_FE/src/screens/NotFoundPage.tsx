import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-orange-300 to-yellow-300">
            <h1 className="text-4xl font-bold mb-4">
                404 - Trang không tồn tại
            </h1>
            <p className="text-lg mb-8">
                Trang bạn đang tìm kiếm không tồn tại.
            </p>
            <Link to="/" className="hover:underline font-bold text-xl">
                Trở về trang chủ
            </Link>
        </div>
    );
};

export default NotFoundPage;

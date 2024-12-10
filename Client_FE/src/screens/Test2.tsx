import React from "react";

interface Product {
    name: string;
    price: number;
    colors: string[];
    sizes: string[];
    imageUrl: string;
    inStock: boolean;
    reviews: number;
    rating: number;
    description: string;
}

const productData: Product = {
    name: "AIRism Áo Hoodie Chống UV Vải Mắt Lưới Kéo Khóa",
    price: 686000,
    colors: ["#F5F5F5", "#959595", "#000000", "#FDE4D9", "#D6D6D6", "#BCE3F7"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageUrl: "https://www.uniqlo.com/vn/vi/products/E456757-000",
    inStock: false,
    reviews: 999,
    rating: 5,
    description: "Sản phẩm được làm từ chất liệu tái chế",
};

const ProductDetails: React.FC<Product> = ({
    name,
    price,
    colors,
    sizes,
    imageUrl,
    inStock,
    reviews,
    rating,
    description,
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <img src={imageUrl} alt={name} className="w-full h-auto" />
            </div>
            <div className="flex-1">
                <h1 className="text-2xl font-bold">{name}</h1>
                <div className="flex items-center gap-2 mt-4">
                    <div className="flex gap-2">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className={`w-6 h-6 rounded-full border border-gray-300 cursor-pointer ${
                                    color === "#959595"
                                        ? "bg-gray-500"
                                        : "bg-" + color
                                }`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {sizes.map((size, index) => (
                            <div
                                key={index}
                                className={`px-4 py-2 border border-gray-300 cursor-pointer ${
                                    size === "S"
                                        ? "bg-gray-500 text-white"
                                        : "bg-white"
                                }`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-lg font-bold mt-4">
                    {price.toLocaleString("vi-VN")} VND
                </p>
                <p className="text-lg mt-2">{description}</p>
                <div className="flex items-center gap-2 mt-4">
                    <p className="text-lg font-bold">Đánh giá:</p>
                    <div className="flex gap-1">
                        {[...Array(rating).keys()].map((_, index) => (
                            <i
                                key={index}
                                className="fas fa-star text-yellow-500"
                            />
                        ))}
                    </div>
                    <p className="text-lg font-bold">({reviews}+)</p>
                </div>
                <button
                    className={`px-4 py-2 mt-4 ${
                        inStock
                            ? "bg-blue-500 hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!inStock}
                >
                    {inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
                </button>
            </div>
        </div>
    );
};

const Test2 = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <ProductDetails {...productData} />
        </div>
    );
};

export default Test2;

import React, { useState } from "react";

const Test: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState("PINK");
    const [selectedSize, setSelectedSize] = useState("L");
    const [quantity, setQuantity] = useState(1);

    const handleColorChange = (color: string) => setSelectedColor(color);
    const handleSizeChange = (size: string) => setSelectedSize(size);
    const handleQuantityChange = (delta: number) => {
        if (quantity + delta > 0) {
            setQuantity(quantity + delta);
        }
    };

    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <main className="container mx-auto p-4">
                {/* Product Section */}
                <section className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-2">
                        AIRism Áo Hoodie Chống UV Vải Mát Lưới Kéo Khóa | Họa
                        Tiết
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Màu sắc: {selectedColor}
                    </p>

                    {/* Colors */}
                    <div className="flex items-center mb-4 gap-x-4">
                        {["PINK", "LIGHT GREEN", "PURPLE"].map((color) => (
                            <button
                                key={color}
                                className={`w-10 h-10 rounded-full border ${
                                    selectedColor === color
                                        ? "border-black scale-110"
                                        : "border-gray-300"
                                } hover:border-black transition-transform duration-200 transform`}
                                style={{
                                    backgroundColor:
                                        color === "PINK"
                                            ? "#f8c0c8"
                                            : color === "LIGHT GREEN"
                                            ? "#c8e5d3"
                                            : "#c8c8e5",
                                }}
                                onClick={() => handleColorChange(color)}
                                aria-label={`Select color ${color}`}
                            ></button>
                        ))}
                    </div>

                    {/* Sizes */}
                    <p className="text-sm text-gray-500 mb-2">
                        Kích cỡ: NỮ {selectedSize}
                    </p>
                    <div className="flex space-x-2 mb-4">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                                key={size}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                                    selectedSize === size
                                        ? "border-black bg-gray-200 shadow-lg"
                                        : "border-gray-300"
                                } hover:bg-gray-100 hover:shadow transition-all duration-200`}
                                onClick={() => handleSizeChange(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Price */}
                    <p className="text-xl font-bold text-red-600 mb-4">
                        686.000 VND
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-4">
                        <button
                            className="px-4 py-2 text-lg font-semibold border-l border-t border-b border-gray-300 rounded-l-full   hover:text-gray-400 transition-colors duration-200"
                            onClick={() => handleQuantityChange(-1)}
                        >
                            -
                        </button>
                        <span className="px-4 py-2 text-lg border-t border-b border-gray-300">
                            {quantity}
                        </span>
                        <button
                            className="px-4 py-2 text-lg font-semibold border-r border-t border-b border-gray-300 rounded-r-full hover:text-gray-400 transition-colors duration-200"
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart */}
                    <button className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                        Thêm vào giỏ hàng
                    </button>

                    {/* Size Check */}
                    <p className="mt-4 text-sm text-gray-500 underline">
                        <a href="#">Kiểm tra kích cỡ</a>
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Test;

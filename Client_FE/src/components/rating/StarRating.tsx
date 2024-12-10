import React from "react";
import { EmptyStar, HalfStar, Star } from "../icon/Icon";

const StarRating = ({ rating }) => {
    // Tạo mảng chứa các số thứ tự từ 1-5
    const fullStars = Math.floor(rating); // Số sao đầy đủ
    const halfStar = rating % 1 >= 0.5; // Xác định nếu có sao nửa
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao trống

    return (
        <div className="flex">
            {/* Render sao đầy đủ */}
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <Star key={index} />
                ))}

            {/* Render sao nửa nếu có */}
            {halfStar && <HalfStar />}

            {/* Render sao trống */}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <EmptyStar key={index + fullStars + (halfStar ? 1 : 0)} />
                ))}
        </div>
    );
};

export default StarRating;

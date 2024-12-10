import React from "react";
import classNames from "@/utils/classNames";
import { Category } from "@/data/Product.interface";
import { Sale } from "@/data/Sale.interface";

type PropTypes = {
    field: any;
    dropdownLabel: string;
    list: Sale[];
    className?: string;
    error: string;
};

const DropdownSale = ({
    field,
    dropdownLabel = "",
    list = [],
    className = "",
    error,
}: PropTypes) => {
    const { value, onChange } = field;

    return (
        <>
            <select
                value={value?.id || ""}
                onChange={(e) => {
                    const selectedSize = list.find(
                        (size) => size.id === e.target.value
                    );
                    onChange(selectedSize);
                }}
                className={classNames(
                    "px-5 py-3 rounded-md border border-c6 text-lg",
                    className,
                    error.length > 0
                        ? "border-red-700"
                        : "border-gray-c3 text-black"
                )}
            >
                <option value="" disabled>
                    {dropdownLabel}
                </option>
                {list.map((item, index) => (
                    <option value={item.id} key={index}>
                        {item.name}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-700">{error}</span>}
        </>
    );
};

export default DropdownSale;

import React from "react";
import classNames from "@/utils/classNames";

type PropTypes = {
    field: any;
    dropdownLabel: string;
    list: string[];
    className?: string;
    error: string;
};

const DropdownSize = ({
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
                value={value || ""}
                onChange={(e) => {
                    console.log(e.target.value);

                    const size = e.target.value;
                    onChange(size);
                }}
                className={classNames(
                    "px-5 py-3 w-full rounded-md border border-c6 text-lg",
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
                    <option value={item} key={index}>
                        {item}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-700">{error}</span>}
        </>
    );
};

export default DropdownSize;

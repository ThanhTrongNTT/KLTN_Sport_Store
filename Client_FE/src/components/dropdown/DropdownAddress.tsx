import React from "react";
import classNames from "../../libs/utils/classNames";
import { useWatch } from "react-hook-form";
import { Province } from "vietnam-provinces";
type PropTypes = {
    name: string;
    control: any;
    dropdownLabel: string;
    setValue: Function;
    list: Province[];
    className: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error: string;
};

const DropdownAddress = ({
    name,
    control,
    dropdownLabel = "",
    setValue,
    list = [],
    className,
    onChange,
    error,
}: PropTypes) => {
    const dropdownValue = useWatch({
        control,
        name,
        defaultValue: dropdownLabel, // default value before the render
    });

    const handleGetValue = (e: any) => {
        const selectedValue = e.target.value;
        setValue(name, selectedValue);
        console.log(`Dropdown [${name}] selected value:`, selectedValue);
        onChange(e);
    };

    return (
        <div className="flex flex-col">
            <select
                defaultValue={dropdownLabel}
                onChange={handleGetValue}
                className={classNames(
                    `px-5 py-3 rounded-md border border-c6 ${className}`,
                    error && error.length > 0
                        ? "border-red-700 text-red-700"
                        : "border-gray-c3 text-black"
                )}
            >
                <option value={dropdownLabel} disabled>
                    {dropdownLabel}
                </option>
                {list.map((item, index) => (
                    <option data-value={item} key={index}>
                        {item.name}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-700">{error}</span>}
        </div>
    );
};

export default DropdownAddress;

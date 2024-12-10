import {
    Control,
    FieldValues,
    UseFormSetValue,
    useWatch,
} from "react-hook-form";
import classNames from "@/utils/classNames";
import { ChangeEvent } from "react";

type PropTypes = {
    name: string;
    control: any;
    dropdownLabel: string;
    setValue: UseFormSetValue<any>;
    list: Array<string>;
    className: string;
};

const Dropdown = ({
    name,
    control,
    dropdownLabel = "",
    setValue,
    list = [],
    className,
}: PropTypes) => {
    const dropdownValue = useWatch({
        control,
        name,
        defaultValue: dropdownLabel, // default value before the render
    });

    const handleGetValue = async (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(name, e.target.value);
    };

    return (
        <select
            value={dropdownValue}
            onChange={handleGetValue}
            className={classNames(
                "px-5 py-3 rounded-md border border-c6 text-lg",
                className
            )}
        >
            <option value={dropdownLabel} className="font-semibold" disabled>
                {dropdownLabel}
            </option>
            {list.map((item, index) => (
                <option value={item} key={index} className="font-semibold">
                    {item}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;

import React from "react";
import { useController } from "react-hook-form";
import classNames from "@/utils/classNames";

const InputProfile = ({
    control,
    name,
    placeholder,
    id,
    tabIndex,
    hasDisable,
    type,
}: any) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <div
            className={classNames(
                "flex justify-center items-center gap-4 py-3"
            )}
        >
            <input
                type={type ? type : "text"}
                className="w-full bg-slate-200 rounded-lg text-c3 border-none"
                {...field}
                placeholder={placeholder}
                name={name}
                id={id}
                tabIndex={tabIndex}
                disabled={hasDisable}
            />
        </div>
    );
};

export default InputProfile;

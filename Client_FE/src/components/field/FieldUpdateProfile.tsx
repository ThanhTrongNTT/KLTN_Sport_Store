import classNames from "../../libs/utils/classNames";
import InputProfile from "../input/InputProfile";
import Label from "../label/Label";
import React from "react";
const FieldUpdateProfile = ({ children, hasDisable, color, ...rest }: any) => {
    return (
        <div className="flex flex-col gap-3">
            <Label
                htmlFor={rest.id}
                className={classNames(
                    "font-DMSans leading-none",
                    hasDisable && "pointer-events-none select-none bg-gray-100",
                    color
                )}
            >
                {children}
            </Label>
            <InputProfile hasDisable={hasDisable} {...rest} />
        </div>
    );
};
export default FieldUpdateProfile;

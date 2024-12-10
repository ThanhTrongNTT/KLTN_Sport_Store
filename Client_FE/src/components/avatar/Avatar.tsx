import React from "react";
import classNames from "../../libs/utils/classNames";
type Avatarprops = {
    src: string;
    sx: string;
};

const Avatar = ({ src, sx }: Avatarprops) => {
    switch (sx) {
        case "default":
            sx = "w-8 h-8";
            break;
        default:
            break;
    }

    return (
        <div
            className={classNames(
                "flex rounded-full object-cover w-10 h-10 items-center justify-center overflow-hidden bg-gray-300"
            )}
        >
            <img
                src={src}
                alt="avt"
                loading="lazy"
                className={classNames("", sx)}
            />
        </div>
    );
};

export default Avatar;

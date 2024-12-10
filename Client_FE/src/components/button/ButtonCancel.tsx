import React from "react";
import { IconTrash } from "../icon/Icon";
import classNames from "../../libs/utils/classNames";

type PropTypes = {
    onClick: any;
    disable?: boolean;
};

const ButtonCancel = ({ onClick, disable }: PropTypes) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                "font-semibold text-orange-400 mr-4 px-6 py-2 rounded-md  flex items-center justify-center gap-2 transition-all",
                disable
                    ? "bg-gray-100 !text-gray-c6 border !border-transparent cursor-no-drop pointer-events-none select-none"
                    : "hover:text-white hover:bg-gradient-to-br hover:from-orange-500  border border-orange-300 hover:to-pink-500"
            )}
        >
            <span className="leading-none">
                <IconTrash />
            </span>
            Hủy bỏ
        </button>
    );
};

export default ButtonCancel;

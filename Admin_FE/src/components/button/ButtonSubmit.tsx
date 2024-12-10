import classNames from "@/utils/classNames";
import { ReactNode } from "react";

type PropTypes = {
    children: ReactNode;
    disable?: boolean;
};
const ButtonSubmit = ({ children, disable }: PropTypes) => {
    return (
        <button
            type="submit"
            className={classNames(
                "text-white px-5 py-2 bg-gradient-to-brtext-lg font-semibold rounded-md hover:bg-gradient-to-br",
                disable
                    ? "bg-gray-100 !text-gray-c6 border !border-transparent cursor-no-drop pointer-events-none select-none"
                    : "bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            )}
        >
            {children}
        </button>
    );
};

export default ButtonSubmit;

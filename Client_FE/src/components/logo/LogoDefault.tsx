import { Link } from "react-router-dom";
import React from "react";

import Logo from "./Logo";
import classNames from "../../libs/utils/classNames";

const LogoDefault = ({ className = "" }) => {
    return (
        <Link to="/">
            <div
                className={classNames(
                    "header-left flex cursor-pointer select-none items-center gap-[10px]",
                    className
                )}
            >
                <img src="/src/assets/logo.png" alt="" className="h-10 w-10" />
                <div className="text-sm font-bold text-c2 lg:text-xl text-black">
                    Sport Store
                </div>
            </div>
        </Link>
    );
};

export default LogoDefault;

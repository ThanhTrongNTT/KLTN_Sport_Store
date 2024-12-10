import { IconHidePass, IconShowPass } from "../icon/Icon";
import React from "react";
const TogglePassword = ({ open = false, ...props }) => {
    if (open) {
        return <IconShowPass {...props} />;
    }
    return <IconHidePass {...props} />;
};

export default TogglePassword;

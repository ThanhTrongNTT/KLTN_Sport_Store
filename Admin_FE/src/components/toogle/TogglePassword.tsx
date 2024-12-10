import { IconHidePass, IconShowPass } from "../icon/Icon";

const TogglePassword = ({ open = false, ...props }) => {
    if (open) {
        return <IconShowPass {...props} onClick={props.onClick} />;
    }
    return <IconHidePass {...props} onClick={props.onClick} />;
};

export default TogglePassword;

import { District } from "vietnam-provinces";
import * as Yup from "yup";

export const EmailSchema = Yup.string()
    .required("Please enter your emaill address!")
    .matches(
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        { message: "Please enter valid email address" }
    );

export const PasswordSchema = Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be 8 characters");

export const ConfirmPasswordSchema = Yup.string()
    .required("Please enter your confirm password")
    .min(8, "Password must be 8 characters");

export const OrderSchema = Yup.object().shape({
    firstName: Yup.string().required("Hãy nhập họ của bạn!"),
    lastName: Yup.string().required("Hãy nhập tên của bạn"),
    email: Yup.string()
        .required("Hãy nhập địa chỉ email của bạn!")
        .matches(
            // eslint-disable-next-line no-control-regex
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            { message: "Hãy điền đúng định dạng của email!" }
        ),
    phoneNumber: Yup.string()
        .required("Hãy điền vào số điện thoại của bạn!")
        .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, {
            message: "Hãy điền đúng định dạng của số điện thoại",
        }),
    province: Yup.string().required("Bạn chưa chọn tỉnh thành!"),
    district: Yup.string().required("Bạn chưa chọn quận huyện!"),
    ward: Yup.string().required("Bạn chưa chọn phường xã!"),
    address: Yup.string().required("Hãy nhập địa chỉ tự thể của bạn"),
    note: Yup.string().optional(),
    coupon: Yup.string().optional(),
});

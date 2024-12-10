import { Coupon } from "@/data/Coupon.interface";
import { Image } from "@/data/Image.interface";
import {
    Category,
    Color,
    Product,
    ProductItem,
} from "@/data/Product.interface";
import { Sale } from "@/data/Sale.interface";
import * as Yup from "yup";
export const ProductSchema = Yup.object<Product>({
    id: Yup.string().optional(),
    freeInformation: Yup.string().required(
        "Please enter your Product free information!"
    ),
    longDescription: Yup.string().required(
        "Please enter your Product long description!"
    ),
    washingInformation: Yup.string().required(
        "Please enter your Product washing information!"
    ),
    productName: Yup.string().required("Please enter your Product name!"),
    slug: Yup.string().required("Please enter your Product description!"),
    basePrice: Yup.number()
        .min(50000, "Please input value over 50000")
        .required(),
    gender: Yup.mixed<Category>().required(
        "Please choose your Product gender!"
    ),
    category: Yup.mixed<Category>().required(
        "Please choose your Product category!"
    ),
    subImages: Yup.array()
        .min(1, "Please provide at least one image!")
        .required("Please provide images!"),
});

export const categorySchema: Yup.ObjectSchema<Category> = Yup.object({
    id: Yup.string().optional(),
    categoryName: Yup.string().required("Please enter your Category name!"),
    locale: Yup.string().required("Please enter your Locale!"),
    level: Yup.number().optional(),
    parentCategory: Yup.mixed<Category>().optional(),
});

export const saleSchema: Yup.ObjectSchema<Sale> = Yup.object({
    id: Yup.string().optional(),
    name: Yup.string().required("Please enter your Sale name!"),
    description: Yup.string().required("Please enter your description!"),
    code: Yup.string().required("Please enter your code!"),
    discount: Yup.number()
        .min(1, "Please input value over 1")
        .max(99, "Max value is 99%")
        .required("Please enter your discount!"),
    startDate: Yup.string().required("Please enter your start date!"),
    endDate: Yup.string().required("Please enter your end date!"),
});

export const couponSchema: Yup.ObjectSchema<Coupon> = Yup.object({
    id: Yup.string().optional(),
    description: Yup.string().required("Please enter your description!"),
    code: Yup.string().required("Please enter your code!"),
    discount: Yup.number()
        .min(1, "Please input value over 1")
        .max(99, "Max value is 99%")
        .required("Please enter your discount!"),
    startDate: Yup.string().required("Please enter your start date!"),
    endDate: Yup.string().required("Please enter your end date!"),
});

export const colorSchema: Yup.ObjectSchema<Color> = Yup.object({
    id: Yup.string().optional(),
    code: Yup.string()
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Please enter valid color code(#xxxxxx)!",
        })
        .required("Please enter your color code!"),
    name: Yup.string().required("Please enter your color name!"),
    displayCode: Yup.string().required("Please enter your display code!"),
});

export const productItemSchema: Yup.ObjectSchema<ProductItem> = Yup.object({
    id: Yup.string().optional(),
    color: Yup.mixed<Color>().required("Please choose your color!"),
    size: Yup.string().required("Please choose your size!"),
    stock: Yup.number().min(1, "Please input value over 1").required(),
    mainImage: Yup.mixed<Image>().required("Please provide images!"),
    product: Yup.mixed<Product>().optional(),
});

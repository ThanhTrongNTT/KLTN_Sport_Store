import React, { useEffect, useState } from "react";
import ImageCustom from "../../components/Image/ImageCustom";
import classNames from "../../libs/utils/classNames";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { LeftArrowIcon, RightArrowIcon } from "../../components/icon/Icon";
import ProductItem from "../../components/Products/ProductItem";
import { Breadcrumb } from "flowbite-react";
import {
    Color,
    initProductItem,
    Product,
    ProductItem as ProductItemInterface,
} from "../../data/Product";
import productApi from "../../libs/api/product.api";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
    bundle,
    getBundledProducts,
    getPopularProducts,
    getViewedProducts,
    popular,
    viewed,
} from "../../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";

interface ColorWithSizes {
    color: Color;
    productItems: ProductItemInterface[];
}

const sizeList = ["XS", "S", "M", "L", "XL", "XXL"];

const DetailProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const slug = window.location.pathname.split("/")[2];
    const cart = useAppSelector((state) => state.cart.items);
    const [product, setProduct] = useState<Product | null>(null);
    const [productItems, setProductItems] = useState<ProductItemInterface[]>(
        []
    );
    const [selectedProduct, setSelectedProduct] =
        useState<ProductItemInterface>(initProductItem);
    const popularList = useAppSelector(getPopularProducts);
    const viewedList = useAppSelector(getViewedProducts);
    const bundleList = useAppSelector(getBundledProducts);
    const [selectedColor, setSelectedColor] = useState<ColorWithSizes | null>(
        null
    );
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [tab, setTab] = useState<string>("description");

    var settingsSlider = {
        // dots: true,
        speed: 500,
        slidesToScroll: 4,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        nextArrow: <RightArrowIcon />,
        prevArrow: <LeftArrowIcon />,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleGetColorsWithSizes = (): ColorWithSizes[] => {
        const colorMap = new Map<
            string,
            { color: Color; productItems: ProductItemInterface[] }
        >();

        productItems.forEach((item) => {
            const { color } = item;

            if (color && color.id) {
                if (colorMap.has(color.id)) {
                    const existing = colorMap.get(color.id);
                    if (existing) {
                        existing.productItems.push(item);
                    }
                } else {
                    colorMap.set(color.id, {
                        color,
                        productItems: [item],
                    });
                }
            }
        });
        return Array.from(colorMap.values());
    };
    const colorsWithSizes = handleGetColorsWithSizes();

    const handleAddToCart = () => {
        const productItem = productItems.find(
            (item) =>
                item.color?.id === selectedColor?.color.id &&
                item.size === selectedSize
        );
        dispatch(addToCart(productItem));
        toast.success("Product added to cart.", {
            autoClose: 1000,
            pauseOnHover: true,
            draggable: true,
            delay: 50,
        });
    };
    const handleClickSize = (item: ProductItemInterface) => {
        setSelectedProduct(item);
        if (item.size) setSelectedSize(item.size);
    };

    const isStock = () => {
        if (!selectedProduct || !selectedProduct.stock) {
            return true;
        }

        const stock = selectedProduct.stock;

        return cart.every((item) => item.quantity && item.quantity < stock);
    };
    const getProductItemsList = async (id: string) => {
        productApi.getProductItemsList(id).then((res) => {
            if (res.result) {
                setProductItems(res.data);
            }
        });
    };

    const getProduct = async () => {
        productApi
            .getProductBySlug(slug)
            .then((res) => {
                if (res.result) {
                    setProduct(res.data);
                    if (res.data.id) {
                        getProductItemsList(res.data.id);
                    }
                }
            })
            .catch((err) => {
                if (!err.response.data.result) {
                    navigate("/not-found");
                }
            });
    };

    useEffect(() => {
        getProduct();
        dispatch(popular());
        dispatch(viewed());
        dispatch(bundle());
    }, []);

    useEffect(() => {
        console.log(selectedProduct);
    }, [selectedProduct]);

    const handleColorChange = (item: ColorWithSizes) => {
        setSelectedColor(item);
    };
    const handleQuantityChange = (delta: number) => {
        if (quantity + delta > 0) {
            setQuantity(quantity + delta);
        }
    };

    return (
        <div className="font-[sans-serif]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-baseline justify-between py-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">
                            <span className="font-bold">Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            href={`/product?gender=${product?.gender?.categoryName}`}
                        >
                            <span className="font-bold">
                                {product?.gender?.locale?.toUpperCase()}
                            </span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {product?.category?.locale}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="w-full top-0 text-center">
                        <div className="flex justify-center">
                            <img
                                src={
                                    "https://readymadeui.com/images/product1.webp"
                                }
                                alt="Shirt"
                                className="lg:w-2/3 w-1/3 h-1/3 lg:h-full rounded-xl object-cover object-top"
                            />
                        </div>
                        <div className="flex gap-x-8 gap-y-6 justify-center mx-auto mt-6">
                            {product?.subImages &&
                                product?.subImages.length > 1 &&
                                product?.subImages.map((image) => (
                                    <img
                                        key={image.id}
                                        // onClick={() => setImage(image.url)}
                                        src={image.url}
                                        alt={image.fileName}
                                        className="w-20 cursor-pointer rounded-xl overflow-hidden transition transform duration-300 ease-in-out hover:scale-110 hover:border hover:border-gray-300"
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="grid grid-cols-2">
                            <div>
                                <h2 className="font-semibold text-gray-800">
                                    {product?.productName}
                                </h2>
                                <p className="text-sm text-gray-400 mt-2">
                                    {product?.gender?.locale?.toUpperCase() ||
                                        ""}
                                </p>
                            </div>
                            <div className="ml-auto h-fit flex flex-wrap gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        toast.success("Add to wishlist", {
                                            autoClose: 1000,
                                            delay: 10,
                                            draggable: true,
                                            pauseOnHover: false,
                                        });
                                    }}
                                    className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12px"
                                        fill="currentColor"
                                        className="mr-1"
                                        viewBox="0 0 64 64"
                                    >
                                        <path
                                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                    100
                                </button>
                                <button
                                    type="button"
                                    className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12px"
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                                            data-original="#000000"
                                        />
                                        <path
                                            d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                                            data-original="#000000"
                                        />
                                        <path
                                            d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                                            data-original="#000000"
                                        />
                                        <path
                                            d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                                            data-original="#000000"
                                        />
                                        <path
                                            d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <hr className="my-8" />
                        {productItems.length > 0 ? (
                            <div>
                                <div className="flex flex-col mb-4 gap-y-2">
                                    <div className="flex items-center gap-x-4">
                                        {colorsWithSizes.map((item) => (
                                            <button
                                                key={item.color.id}
                                                className={`w-10 h-10 rounded-full border ${
                                                    selectedColor?.color
                                                        .name ===
                                                    item.color.name
                                                        ? "border-black scale-110 border-2"
                                                        : "border-gray-300 border-4"
                                                } hover:border-gray-400 transition-transform duration-200 transform`}
                                                style={{
                                                    backgroundColor:
                                                        item.color.code,
                                                }}
                                                onClick={() =>
                                                    handleColorChange(item)
                                                }
                                                aria-label={`Select color ${item.color}`}
                                            ></button>
                                        ))}
                                    </div>
                                    <span className="text-[#6a6a6a] text-sm">
                                        Màu sắc:{" "}
                                        {selectedColor?.color.displayCode}{" "}
                                        {selectedColor?.color.name}
                                    </span>
                                </div>
                                <div className="flex flex-col mb-4 gap-y-2">
                                    <div className="flex space-x-2">
                                        {selectedColor
                                            ? selectedColor.productItems.map(
                                                  (item, index) => (
                                                      <button
                                                          key={index}
                                                          className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                                                              item.size ===
                                                              selectedSize
                                                                  ? "border-gray-500 bg-gray-200 shadow-lg"
                                                                  : "border-gray-300"
                                                          } hover:bg-gray-100 hover:shadow transition-all duration-200`}
                                                          onClick={() =>
                                                              handleClickSize(
                                                                  item
                                                              )
                                                          }
                                                      >
                                                          {item.size}
                                                      </button>
                                                  )
                                              )
                                            : sizeList.map((size, index) => (
                                                  <button
                                                      key={index}
                                                      className={` cursor-not-allowed px-4 py-2 border rounded-lg text-sm font-medium`}
                                                  >
                                                      {size}
                                                  </button>
                                              ))}
                                    </div>
                                    <span className="text-[#6a6a6a] text-sm ">
                                        Kích cỡ: {product?.gender?.locale}{" "}
                                        {selectedSize}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <> Không có sản phẩm phù hợp</>
                        )}

                        <hr className="my-8" />
                        <div className="flex justify-between">
                            <div>
                                <div className="flex flex-wrap gap-4 items-start justify-between mb-5">
                                    <div>
                                        {product?.basePrice ===
                                        product?.promoPrice ? (
                                            <>
                                                <p>
                                                    <span className="text-lg font-semibold text-black dark:text-[#E0E0E0]">
                                                        {product?.basePrice?.toLocaleString(
                                                            "it-IT",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                    </span>
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p>
                                                    <span className="text-lg font-semibold line-through text-black dark:text-[#E0E0E0]">
                                                        {product?.basePrice?.toLocaleString(
                                                            "it-IT",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="text-2xl font-bold text-red-500 dark:text-[#E0E0E0]">
                                                        {product?.promoPrice?.toLocaleString(
                                                            "it-IT",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                    </span>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-base text-red-500">
                                        {product?.sales &&
                                            product?.sales.description}
                                    </span>
                                </div>
                                {productItems.length === 0 ? (
                                    <span className="text-gray-500">
                                        Không có sản phẩm phù hợp
                                    </span>
                                ) : selectedProduct.id !== "" && !isStock() ? (
                                    <span className="text-red-500">
                                        Hết hàng
                                    </span>
                                ) : null}
                            </div>
                            <div className="flex flex-wrap gap-4 h-fit">
                                <span className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center">
                                    <svg
                                        className="w-3 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 14 13"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    4.8
                                </span>
                                <button
                                    type="button"
                                    className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z"
                                            data-original="#000000"
                                        />
                                        <path
                                            d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z"
                                            data-original="#000000"
                                        />
                                        <path
                                            d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                    87 Reviews
                                </button>
                            </div>
                        </div>
                        <hr className="my-8" />
                        <div className="flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={() => handleAddToCart()}
                                className={classNames(
                                    "min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-300 hover:border-gray-500 text-gray-800 text-sm font-bold rounded",
                                    productItems.length > 0 &&
                                        isStock() &&
                                        selectedProduct.id !== ""
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed"
                                )}
                                disabled={
                                    productItems.length > 0 &&
                                    isStock() &&
                                    selectedProduct.id !== ""
                                        ? false
                                        : true
                                }
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-24 max-w-4xl">
                    <ul className="flex border-b">
                        <li
                            onClick={() => setTab("description")}
                            className={classNames(
                                "text-gray-400 font-bold text-sm py-3 px-8 cursor-pointer transition-all hover:bg-gray-100 hover:text-gray-800",
                                tab === "description" &&
                                    "text-gray-800 bg-gray-100 border-b-2 border-gray-800"
                            )}
                        >
                            Description
                        </li>
                        <li
                            onClick={() => setTab("review")}
                            className={classNames(
                                "text-gray-400 font-bold text-sm py-3 px-8 cursor-pointer transition-all hover:bg-gray-100 hover:text-gray-800",
                                tab === "review" &&
                                    "text-gray-800 bg-gray-100 border-b-2 border-gray-800"
                            )}
                        >
                            Reviews
                        </li>
                        <li
                            onClick={() => setTab("rating")}
                            className={classNames(
                                "text-gray-400 font-bold text-sm py-3 px-8 cursor-pointer transition-all hover:bg-gray-100 hover:text-gray-800",
                                tab === "rating" &&
                                    "text-gray-800 bg-gray-100 border-b-2 border-gray-800"
                            )}
                        >
                            Ratings
                        </li>
                    </ul>
                    {tab === "description" ? (
                        <>
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Product Description
                                </h3>
                                <p className="text-sm text-gray-400 mt-4">
                                    {product?.longDescription}
                                </p>
                            </div>
                        </>
                    ) : tab === "review" ? (
                        <>
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Product Review
                                </h3>
                                <p className="text-sm text-gray-400 mt-4">
                                    {product?.freeInformation}
                                </p>
                            </div>
                            <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-400">
                                <li>{product?.washingInformation}</li>
                                <li>{product?.freeInformation}</li>
                            </ul>
                        </>
                    ) : (
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-800">
                                Product Rating
                            </h3>
                            <p className="text-sm text-gray-400 mt-4">
                                Elevate your casual style with our premium men's
                                t-shirt. Crafted for comfort and designed with a
                                modern fit, this versatile shirt is an essential
                                addition to your wardrobe. The soft and
                                breathable fabric ensures all-day comfort,
                                making it perfect for everyday wear. Its classic
                                crew neck and short sleeves offer a timeless
                                look.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div>
                        <div
                            data-aos="fade-up"
                            className="font-bold text-xl flex justify-center py-4"
                        >
                            SẢN PHẨM ĐƯỢC QUAN TÂM
                        </div>
                        <Slider
                            {...settingsSlider}
                            infinite={popularList && popularList.length > 3}
                        >
                            {popularList &&
                                popularList.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        data-aos="fade-up"
                                        data-aos-delay={400 + index * 100}
                                        className="h-[630px]"
                                    >
                                        <ProductItem product={item} />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                    <div className="py-8">
                        <div
                            data-aos="fade-up"
                            className="font-bold text-xl flex justify-center py-4"
                        >
                            SẢN PHẨM THƯỜNG ĐƯỢC MUA KÈM
                        </div>
                        <div data-aos="zoom-in">
                            <Slider
                                {...settingsSlider}
                                infinite={viewedList && viewedList.length > 3}
                            >
                                {viewedList &&
                                    viewedList.map((item, index) => (
                                        <div
                                            key={item.id}
                                            data-aos="fade-up"
                                            data-aos-delay={400 + index * 100}
                                            className="h-[630px]"
                                        >
                                            <ProductItem product={item} />
                                        </div>
                                    ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="py-8">
                        <div data-aos="fade-up" className="font-bold text-xl">
                            ĐÃ XEM GẦN ĐÂY
                        </div>
                        <Slider
                            {...settingsSlider}
                            infinite={bundleList && bundleList.length > 3}
                        >
                            {bundleList &&
                                bundleList.map((item, index) => (
                                    <div
                                        key={item.id}
                                        data-aos="fade-up"
                                        data-aos-delay={400 + index * 100}
                                        className="h-[630px]"
                                    >
                                        <ProductItem product={item} />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </div>
            }
        </div>
    );
};

export default DetailProductPage;

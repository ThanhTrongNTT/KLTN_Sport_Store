import ImageCustom from "@/components/image/ImageCustom";
import { Image } from "@/data/Image.interface";
import { Product } from "@/data/Product.interface";
import { Slide } from "react-slideshow-image";

type ProductCardProps = {
    // Props here
    onCloseDel: () => void;
    product: Product;
    onCloseEdit: (product: Product) => void;
    setIdDeleted: (id: string) => void;
};
const ProductCard = ({
    onCloseDel,
    onCloseEdit,
    product,
    setIdDeleted,
}: ProductCardProps) => {
    return (
        <div className="bg-white border-sm shadow-lg w-1/5 p-5 m-4 rounded-md flex flex-col justify-between gap-y-2">
            {/* <div className="h-[250px] content-center"> */}
            {/* <Slide>
                {product.subImages && product.subImages.length > 0 ? (
                    product.subImages.map((image: Image) => (
                        <ImageCustom
                            key={image.id}
                            className="h-full w-full object-cover rounded-md"
                            alt={image.fileName}
                            src={
                                image.url ??
                                "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                            }
                        />
                    ))
                ) : (
                    <ImageCustom
                        alt={"Test"}
                        className="h-full w-full"
                        src={
                            "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                        }
                    />
                )}
            </Slide> */}
            {/* </div> */}
            <div className="flex flex-col justify-between font-bold">
                <h1 className="h-12 overflow-hidden">
                    Product Name:{" "}
                    <span className="font-normal" title={product.productName}>
                        {product.productName}
                    </span>
                </h1>
                <span className="h-12 overflow-hidden">
                    Description:{" "}
                    <span
                        className="font-normal"
                        title={product.freeInformation}
                    >
                        {product.freeInformation}
                    </span>
                </span>
                <span>
                    Price:{" "}
                    <span className="font-normal">
                        {product?.basePrice?.toLocaleString("vi-VN") + " VND"}
                    </span>
                </span>
                <span>
                    Category:{" "}
                    <span className="font-normal">
                        {product.gender?.categoryName}
                    </span>
                </span>
            </div>
            <div className="flex gap-x-5 justify-between font-bold p-2 mt-4">
                <button
                    className="flex-1 p-1 bg-green-300  rounded-md hover:bg-green-500"
                    onClick={() => onCloseEdit(product)}
                >
                    View
                </button>
                <button
                    className="flex-1  p-1 bg-blue-300  rounded-md hover:bg-blue-500"
                    onClick={() => onCloseEdit(product)}
                >
                    Edit
                </button>
                <button
                    className=" flex-1 p-1 bg-red-300  rounded-md hover:bg-red-500"
                    onClick={() => {
                        setIdDeleted(product?.id ?? "");
                        onCloseDel();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

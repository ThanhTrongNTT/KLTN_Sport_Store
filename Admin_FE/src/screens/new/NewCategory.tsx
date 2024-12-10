import Field from "@/components/field/Field";
import { Category } from "@/data/Product.interface";
import { categorySchema } from "@/utils/schema.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface NewCategoryProps {
    category: Category;
    setCategory: (category: Category) => void;
    handleCreateNew: (data: FieldValues) => void;
}

const NewCategory = ({
    handleCreateNew,
    category,
    setCategory,
}: NewCategoryProps) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Category>({
        resolver: yupResolver(categorySchema),
        mode: "onSubmit",
        defaultValues: {
            categoryName: category.categoryName,
            locale: category.locale,
        },
    });

    const resetValues = () => {
        reset({
            categoryName: "",
            locale: "",
        });
        setCategory({
            categoryName: "",
            locale: "",
            level: 1,
            parentCategory: null,
            id: "",
            // removalFlag: false,
        });
    };

    useEffect(() => {
        reset({
            categoryName: category.categoryName,
            locale: category.locale,
        });
    }, [category, reset]);

    const submit = async (data: FieldValues) => {
        await handleCreateNew(data);
        resetValues();
    };

    // Show error nếu có lỗi xảy ra
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            if (arrErrors[0]?.message) {
                const message = arrErrors[0]?.message;
                toast.error(message.toString(), {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
            }
        }
    }, [errors]);

    return (
        <div className="w-[800px]">
            <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(submit)}>
                    <h1 className="font-bold text-2xl text-center">
                        Khởi tạo danh mục
                    </h1>
                    <div className="text-right mt-10">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Tên{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="categoryName"
                                    id="category-name"
                                    placeholder="Nhập tên..."
                                    error={errors.categoryName?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setCategory({
                                            ...category,
                                            categoryName: e.target.value,
                                        })
                                    }
                                >
                                    Tên danh mục
                                </Field>
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Tên hiển thị{" "}
                                    <span className="text-red-500">(*)</span>
                                </label>
                                <Field
                                    control={control}
                                    name="locale"
                                    id="category-locale"
                                    placeholder="Nhập tên hiển thị..."
                                    error={errors.locale?.message ?? ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setCategory({
                                            ...category,
                                            locale: e.target.value,
                                        });
                                    }}
                                >
                                    Locale
                                </Field>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-10 font-semibold text-white bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-4 py-2 rounded-md inline-block transition-all"
                        >
                            Thêm mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCategory;

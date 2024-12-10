import CategoryAPI from "@/api/category.api";
import Field from "@/components/field/Field";
import CategoryTable from "@/components/table/CategoryTable";
import { Category } from "@/data/Product.interface";
import classNames from "@/utils/classNames";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import NewCategory from "../new/NewCategory";
import { categorySchema } from "@/utils/schema.resolver";

type DetailCategoryProps = {
    // Props here
    category: Category;
    handleUpdate: (data: FieldValues) => void;
};
const DetailCategory = ({ handleUpdate, category }: DetailCategoryProps) => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
    } = useForm<Category>({
        resolver: yupResolver(categorySchema),
        mode: "onSubmit",
    });
    const [modalNew, setModalNew] = useState(false);
    const onCloseNew = () => {
        setModalNew(false);
    };
    const [child, setChild] = useState<Category>();
    const [children, setChildren] = useState<Category[]>([]);
    const fetchChildCategory = async () => {
        if (!category.id) return;
        await CategoryAPI.getChildCategory(category.id).then((response) => {
            setChildren(response.data);
        });
    };
    const formValues = watch();
    const disable = () => {
        return (
            formValues.categoryName === category.categoryName &&
            formValues.locale === category.locale
        );
    };

    const handleCreateNewCategory = (data: Category) => {
        CategoryAPI.addCategory(data).then((response) => {
            if (response.data) {
                toast.success("Create Category success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                fetchChildCategory();
            }
        });
    };

    const handleUpdateCategory = (data: Category) => {
        if (!data.id) return;
        CategoryAPI.updateCategory(data, data.id).then((response) => {
            if (response.data) {
                toast.success("Update Category success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                fetchChildCategory();
            }
        });
    };

    const handleDeleteCategory = (id: string) => {
        CategoryAPI.deleteCategory(id).then((response) => {
            if (response.result) {
                toast.success("Delete Category success!", {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
                fetchChildCategory();
            }
        });
    };

    const submit = (data: FieldValues) => {
        handleUpdate(data);
    };
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

    useEffect(() => {
        fetchChildCategory();
        setValue("categoryName", category.categoryName ?? "");
        setValue("locale", category.locale ?? "");
    }, []);

    return (
        <div className="w-[1200px]">
            <div className="bg-white mt-10 rounded-md px-10 pt-10 pb-5">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(submit)}>
                    <h1 className="font-bold text-center text-2xl">
                        Thông tin danh mục
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
                                >
                                    Tên
                                </Field>
                            </div>
                            <div className="text-left">
                                <label
                                    htmlFor=""
                                    className="text-lg font-semibold text-left"
                                >
                                    Tên hiển thị
                                </label>
                                <Field
                                    control={control}
                                    name="locale"
                                    id="category-locale"
                                    placeholder="Enter Description..."
                                    error={errors.locale?.message ?? ""}
                                >
                                    Tên hiển thị{" "}
                                    <span className="text-red-500">(*)</span>
                                </Field>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={classNames(
                                "mt-10 font-semibold px-4 py-2 rounded-md inline-block transition-all",
                                disable()
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "text-white bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 cursor-pointer"
                            )}
                            disabled={disable()}
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>

                <div className="text-center mt-10">
                    <CategoryTable
                        categories={children}
                        parentCategory={category}
                        handleCreateNewCategory={handleCreateNewCategory}
                        handleUpdateCategory={handleUpdateCategory}
                        handleDeleteCategory={handleDeleteCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailCategory;

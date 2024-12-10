import CategoryAPI from "@/api/category.api";
import { Category } from "@/data/Product.interface";
import React, { useState } from "react";
import { toast } from "react-toastify";

// Khai báo kiểu cho các props của `CategoryTable`
interface CategoryTableProps {
    categories: Category[];
    parentCategory: Category;
    handleCreateNewCategory: (data: Category) => void;
    handleUpdateCategory: (data: Category) => void;
    handleDeleteCategory: (id: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    categories,
    parentCategory,
    handleCreateNewCategory,
    handleUpdateCategory,
    handleDeleteCategory,
}) => {
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editedCategory, setEditedCategory] = useState<Category>({
        categoryName: "",
        level: 2,
        locale: "",
        parentCategory: parentCategory,
    });
    const [childNew, setChildNew] = useState<Category>({
        categoryName: "",
        level: 2,
        locale: "",
        parentCategory: parentCategory,
    });
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (category: Category) => {
        setEditMode(category.id || "");
        setEditedCategory({ ...category });
    };

    const handleDelete = (id: string) => {
        handleDeleteCategory(id);
    };

    const handleCreateCategory = () => {
        if (childNew.categoryName === "") {
            toast.error("Please enter category name!");
        } else if (childNew.locale === "") {
            toast.error("Please enter locale!");
        } else {
            handleCreateNewCategory(childNew);
            setChildNew({
                categoryName: "",
                level: 2,
                locale: "",
                parentCategory: parentCategory,
            });
            setShowForm(false);
        }
    };

    const handleCancelAdd = () => {
        setChildNew({
            categoryName: "",
            level: 2,
            locale: "",
            parentCategory: parentCategory,
        });
        setShowForm(false);
    };

    const handleSave = () => {
        handleUpdateCategory(editedCategory);
        if (editMode && editedCategory) {
            const index = categories.findIndex((cat) => cat.id === editMode);
            categories[index] = { ...editedCategory };
            setEditMode(null);
            setEditedCategory({
                categoryName: "",
                level: 2,
                locale: "",
                parentCategory: parentCategory,
            });
        }
    };

    const handleCancel = () => {
        setEditMode(null);
        setEditedCategory({
            categoryName: "",
            level: 2,
            locale: "",
            parentCategory: parentCategory,
        });
    };

    const handleChangeChildNew = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChildNew((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1 className="m-2 font-bold text-lg">Danh mục con</h1>
            <button
                onClick={() => setShowForm(!showForm)}
                className="px-3 font-bold py-1 bg-blue-500 text-white rounded mb-5 hover:bg-white hover:text-blue-500 border border-blue-500 transition"
            >
                Thêm mới
            </button>
            {showForm && (
                <>
                    {/* <form onSubmit={handleAddChildCategory}> */}
                    <div className="flex min-w-full p-2 mb-5 border justify-between">
                        <div>
                            <label>
                                Tên:
                                <input
                                    type="text"
                                    name="categoryName"
                                    placeholder="Category Name"
                                    value={childNew?.categoryName || ""}
                                    onChange={handleChangeChildNew}
                                    className="border rounded px-2 py-1"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Tên hiển thị:
                                <input
                                    type="text"
                                    name="locale"
                                    placeholder="Category Locale"
                                    value={childNew?.locale || ""}
                                    onChange={handleChangeChildNew}
                                    className="border rounded px-2 py-1"
                                />
                            </label>
                        </div>
                        <div className="flex gap-x-5">
                            <button
                                className="px-3 font-bold py-1 bg-blue-500 text-white rounded mr-2 hover:bg-white hover:text-blue-500 border border-blue-500 transition"
                                onClick={handleCreateCategory}
                            >
                                Thêm
                            </button>
                            <button
                                className="px-3 font-bold py-1 bg-red-500 text-white rounded mr-2 hover:bg-white hover:text-red-500 border border-red-500 transition"
                                onClick={handleCancelAdd}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </>
            )}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Tên</th>
                        <th className="py-2 px-4 border-b">Tên hiển thị</th>
                        <th className="py-2 px-4 border-b">Danh mục cha</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-100">
                            {/* Hiển thị trường categoryName */}
                            <td className="py-3 px-5 border-b">
                                {editMode === category.id ? (
                                    <input
                                        type="text"
                                        name="categoryName"
                                        value={
                                            editedCategory?.categoryName || ""
                                        }
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1 "
                                    />
                                ) : (
                                    category.categoryName
                                )}
                            </td>

                            {/* Hiển thị trường locale */}
                            <td className="py-2 px-4 border-b">
                                {editMode === category.id ? (
                                    <input
                                        type="text"
                                        name="locale"
                                        value={editedCategory?.locale || ""}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1"
                                    />
                                ) : (
                                    category.locale
                                )}
                            </td>

                            {/* Hiển thị trường parentCategory */}
                            <td className="py-2 px-4 border-b">
                                {category.parentCategory
                                    ? category.parentCategory.locale
                                    : "N/A"}
                            </td>

                            {/* Hiển thị các nút hành động */}
                            <td className="py-2 px-4 border-b">
                                {editMode === category.id ? (
                                    <div>
                                        <button
                                            onClick={handleSave}
                                            className="px-3 font-bold py-1 bg-green-500 text-white rounded mr-2 hover:bg-white hover:text-green-500 border border-green-500 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-3 font-bold py-1 bg-gray-500 text-white rounded hover:bg-white hover:text-gray-500 border border-gray-500 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="px-3 font-bold py-1 bg-blue-500 text-white rounded mr-2 hover:bg-white hover:text-blue-500 border border-blue-500 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(category.id || "")
                                            }
                                            className="px-3 font-bold py-1 bg-red-500 text-white rounded mr-2 hover:bg-white hover:text-red-500 border border-red-500 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;

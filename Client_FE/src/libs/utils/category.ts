import { Category } from "../../data/Categories";

export const formatCategories = (categories: Category[]) => {
    const categoryMap = {};

    // Tạo một map với ID của từng category làm khóa
    categories.forEach((category) => {
        categoryMap[category.id] = { ...category, children: [] };
    });

    // Tạo cây phân cấp
    const tree: Array<Category> = [];

    categories.forEach((category) => {
        const parent = category.parentCategory
            ? categoryMap[category.parentCategory.id]
            : null;

        if (parent) {
            // Gắn category vào danh mục con của parent
            parent.children.push(categoryMap[category.id]);
        } else {
            // Nếu không có parent thì đó là cấp cao nhất, thêm vào root
            tree.push(categoryMap[category.id]);
        }
    });

    return tree;
};

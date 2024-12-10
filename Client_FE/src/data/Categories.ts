export interface Category {
    id: string;
    categoryName: string;
    locale: string;
    children: Category[];
    parentCategory: Category | null;
}

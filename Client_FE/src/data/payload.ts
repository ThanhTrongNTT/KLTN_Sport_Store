export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    result: boolean;
}

export interface DataPageResponse<T> {
    items: T[];
    totalPages: number;
    totalItems: number;
    itemCount: number;
    pageSize: number;
    currentPage: number;
}
export interface PageResponse<T> {
    result: boolean;
    message: string;
    code: number;
    data: DataPageResponse<T>;
}

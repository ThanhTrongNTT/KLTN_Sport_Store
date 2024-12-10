export interface JWTType {
    admin: boolean;
    sub: string;
    exp: number;
    iat: number;
}

export interface DataPageResponse<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    pageSize: number;
    itemCount: number;
    currentPage: number;
}
export interface PageResponse<T> {
    result: boolean;
    message: string;
    code: number;
    data: DataPageResponse<T>;
}

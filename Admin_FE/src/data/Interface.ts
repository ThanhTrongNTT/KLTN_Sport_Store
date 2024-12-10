export interface Pagination {
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
}

export interface JWTType {
    admin: boolean;
    sub: string;
    exp: number;
    iat: number;
}

export interface ChangePasswordRequest {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export interface SearchParams {
    keyWord: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
}

export interface LoginData {
    accessToken: string;
    refreshToken: string;
    isAdmin: boolean;
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

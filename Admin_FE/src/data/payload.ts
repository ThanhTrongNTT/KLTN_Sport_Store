export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    result: boolean;
}

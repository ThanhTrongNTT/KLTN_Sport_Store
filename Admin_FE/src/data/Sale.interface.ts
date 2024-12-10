export interface Sale {
    id?: string;
    name?: string;
    description?: string;
    code?: string;
    discount?: number;
    startDate?: string;
    endDate?: string;
}

export const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
});

const currentDate = new Date();
export const initSaleValue = {
    id: "",
    name: "",
    description: "",
    code: "",
    discount: 0,
    startDate: formatter.format(currentDate).replace(",", ""),
    endDate: formatter.format(currentDate).replace(",", ""),
};

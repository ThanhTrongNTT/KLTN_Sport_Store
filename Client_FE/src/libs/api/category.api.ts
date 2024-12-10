import AxiosClient from "./axiosClient/AxiosClient";

const CategoryApi = {
    getCategoryByLevel: (level: number) => {
        const url = `/categories/level/${level}`;
        return AxiosClient.get(url);
    },
    getCategoryByParentName: (name: string) => {
        const url = `/categories/parent/${name}`;
        return AxiosClient.get(url);
    },
    getAllCategory: () => {
        const url = "/categories/list";
        return AxiosClient.get(url);
    },
};

export default CategoryApi;

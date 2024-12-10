import { AxiosResponse } from "axios";
import AxiosClient from "./axiosClient/AxiosClient";
import { Image } from "@/data/Image.interface";
import { ApiResponse } from "@/data/payload";

const MediaFileAPI = {
    upload: (file: File): Promise<ApiResponse<Image>> => {
        const url = "/media/upload";
        const formData = new FormData();
        formData.append("file", file);
        return AxiosClient.post(url, formData);
    },
    uploadFiles: (files: File[]): Promise<ApiResponse<Image>> => {
        const url = "/media/upload-files";
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        return AxiosClient.post(url, formData);
    },
};

export default MediaFileAPI;

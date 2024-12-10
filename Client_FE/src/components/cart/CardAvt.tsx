import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import ImageCustom from "../Image/ImageCustom";
import { IconCheck, IconPen } from "../icon/Icon";
import classNames from "../../libs/utils/classNames";

const CardAvt = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const {
        handleSubmit,
        setValue,
        register,
        formState: { isSubmitting },
    } = useForm({
        mode: "onChange",
    });
    const [disable, setDisable] = useState(true);
    const [baseImg, setBaseImg] = useState<string | ArrayBuffer | null>();
    // const [baseImg, setBaseImg] = useState<any>();
    const handleChangeAvt = () => {
        document.getElementById("inp-upload")?.click();
    };

    const uploadImage = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImg(base64);
    };

    const convertBase64 = (
        file: Blob
    ): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onSubmit = async ({ avatar }: any) => {
        // userApi.updateAvatar(user.sub, avatar).then((response) => {
        //     console.log(response);
        //     toast.error('Update success!', {
        //         autoClose: 500,
        //     });
        // });
        // userApi.getMe(user.sub).then((response) => {
        //     setUserMain(response);
        // });
        setDisable(true);
        // if (!response.data) return null;
        // if (response.status !== 202) {
        //     toast.success(response.data.message, {
        //         autoClose: 500,
        //     });
        //     return new Promise((resolve) => {
        //         setTimeout(async () => {
        //             resolve(1);
        window.location.reload();
        //         }, 1000);
        //     });
        // } else {
        //     toast.error(response.data.message, {
        //         autoClose: 500,
        //     });
        // }
    };
    useEffect(() => {
        setBaseImg(userInfo?.userProfile?.avatar.url);
    }, [userInfo?.userProfile?.avatar.url]);

    // const onSubmit = ({ avatar }: any) => console.log(avatar);
    return (
        <div className="dark:bg-grayScale-c2 mx-auto mt-5 h-full max-h-[560px] w-full max-w-[350px] rounded-xl bg-white px-7 py-8 lg:mx-0">
            <div className="text-center font-DMSans">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative inline-block rounded-full">
                        <ImageCustom
                            src={
                                baseImg
                                    ? baseImg.toString()
                                    : "https://images.unsplash.com/photo-1657662075863-3a5093fcb3f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                            }
                            alt="avt"
                            className="object-cover mb-4 h-[170px] w-[170px] select-none rounded-full"
                        />
                        <button
                            type="button"
                            className={`absolute bottom-0 right-0 flex 
                              -translate-y-1/3 -translate-x-1/3 cursor-pointer items-center justify-center 
                              rounded-full border-2 p-3 transition-all 
                              bg-white text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-black 
                              dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                            onClick={handleChangeAvt}
                        >
                            <span>
                                <IconPen />
                            </span>
                            <input
                                type="text"
                                className="hidden"
                                {...register("avatar")}
                            />
                            <input
                                id="inp-upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    uploadImage(e);
                                    setDisable(false);
                                }}
                            />
                        </button>
                    </div>
                    <p className="dark:text-grayScale-c6 mb-5 font-Roboto text-4xl">
                        {/* <b className=''>{user.fullName}</b> */}
                    </p>
                    <div className="flex justify-between mb-4 font-Roboto text-sm font-medium">
                        <span className="text-grayScale-c3 dark:text-grayScale-c7">
                            Thành viên kể từ
                        </span>
                        <span className=" text-grayScale-c4">
                            {userInfo.modifiedDate}
                        </span>
                    </div>
                    <button
                        disabled={disable}
                        type="submit"
                        className={classNames(
                            "text-white font-semibold bg-purple-400 w-full py-2 rounded-full transition-all",
                            disable
                                ? "bg-opacity-30 cursor-no-drop select-none hover:none"
                                : "hover:bg-purple-500"
                        )}
                        onClick={() => {
                            setValue("avatar", baseImg);
                        }}
                    >
                        {isSubmitting ? (
                            <div className="h-6 w-6 animate-spin rounded-full border-[3px]  border-t-2 border-white border-t-transparent bg-transparent" />
                        ) : (
                            <span>Cập nhật ảnh đại diện</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CardAvt;

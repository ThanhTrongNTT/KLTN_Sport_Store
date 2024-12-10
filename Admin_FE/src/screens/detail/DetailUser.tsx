import WrapperField from "@/components/common/WrapperField";
import Dropdown from "@/components/dropdown/Dropdown";
import { IconTrash } from "@/components/icon/Icon";
import InputDefault from "@/components/input/InputDefault";
import classNames from "@/utils/classNames";
import { useState } from "react";
import { useForm } from "react-hook-form";

type DetailUserProps = {
    // Props here
    isEditModal: boolean;
    onCloseEdit: () => void;
};

const DetailUser = (props: DetailUserProps) => {
    const [disable, setDisable] = useState(true);
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm();
    const onSubmit = async (values: any) => {
        console.log(values);
    };
    const handleCancel = () => {
        reset({
            locationName: "",
            locationType: "Choose Role",
        });
        setDisable(true);
    };
    return (
        <div className="m-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-bold text-xl">Detail User</h1>
                <div className="flex flex-col gap-4">
                    <WrapperField>
                        <label htmlFor="" className="font-bold text-left">
                            Location Name:
                        </label>
                        <InputDefault
                            placeholder="Enter locataion"
                            control={control}
                            name="locationName"
                            className="col-span-3"
                        />
                    </WrapperField>
                    <WrapperField>
                        <label
                            htmlFor=""
                            className="font-bold flex-1 text-left col-span-1"
                        >
                            Location Type:
                        </label>
                        <Dropdown
                            dropdownLabel="Choose Role"
                            control={control}
                            name="locationType"
                            setValue={setValue}
                            list={["BEGINNING", "DESTINATION"]}
                            className="col-span-3"
                        />
                    </WrapperField>
                </div>
            </form>
            <div className="text-right mt-5">
                <div className="flex items-center justify-end">
                    <button
                        type="button"
                        onClick={props.onCloseEdit}
                        className={classNames(
                            "text-lg font-semibold text-orange-400 mr-4 px-6 py-2 rounded-md  flex items-center justify-center gap-2  transition-all",
                            disable
                                ? "bg-gray-100 !text-gray-c6 border !border-transparent cursor-no-drop pointer-events-none select-none"
                                : "hover:text-white hover:bg-gradient-to-br hover:from-orange-500  border border-orange-300 hover:to-pink-500"
                        )}
                    >
                        <span className="leading-none">
                            <IconTrash />
                        </span>
                        Cancle
                    </button>
                    <button
                        // type="submit"
                        onClick={props.onCloseEdit}
                        className="text-white px-5 py-2 bg-gradient-to-br from-orange-500 to-pink-500 text-lg font-semibold rounded-md hover:bg-gradient-to-br hover:from-orange-600 hover:to-pink-600"
                    >
                        Add location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailUser;

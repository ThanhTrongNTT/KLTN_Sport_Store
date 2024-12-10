import classNames from "@/utils/classNames";
import { useController } from "react-hook-form";

const InputDefault = ({ name, control, className, error, ...props }: any) => {
    const { field } = useController({
        name,
        control,
        defaultValue: "",
    });
    return (
        <div className={className}>
            <input
                className={classNames(
                    "px-5 rounded-md py-3 border border-c6 w-full",
                    error.length > 0
                        ? "border-red-700 text-red-700"
                        : "border-gray-c3 text-black"
                )}
                {...field}
                {...props}
            />
            {error && <span className="text-red-700">{error}</span>}
        </div>
    );
};

export default InputDefault;

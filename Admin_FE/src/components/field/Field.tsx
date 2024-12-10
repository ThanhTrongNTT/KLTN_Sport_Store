import InputDefault from "../input/InputDefault";

const Field = ({ children, ...props }: any) => {
    return (
        <div className="text-left flex items-left flex-col gap-2">
            <InputDefault {...props} />
        </div>
    );
};

export default Field;

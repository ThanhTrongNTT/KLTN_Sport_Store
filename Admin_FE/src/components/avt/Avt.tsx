import classNames from "@/utils/classNames";

type Avtprops = {
    src: string;
    sx: string;
};

const Avt = ({ src, sx }: Avtprops) => {
    switch (sx) {
        case "default":
            sx = "w-8 h-8";
            break;
        default:
            break;
    }

    return (
        <div
            className={classNames(
                "flex rounded-full object-cover border border-gray-400 w-10 h-10 items-center justify-center overflow-hidden bg-gray-300"
            )}
        >
            <img
                src={src}
                alt="avt"
                loading="lazy"
                className={classNames("", sx)}
            />
        </div>
    );
};

export default Avt;

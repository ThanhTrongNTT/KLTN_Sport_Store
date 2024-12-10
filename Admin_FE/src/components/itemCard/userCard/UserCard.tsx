import ImageCustom from "@/components/image/ImageCustom";
import { User } from "@/data/User.interface";
import classNames from "@/utils/classNames";

type UserCardProps = {
    // Props here
    onCloseDel: () => void;
    handleActive: (user: User) => void;
    user: User;
    id: string;
    setIdDelete: (id: string) => void;
};
const UserCard = ({
    id,
    setIdDelete,
    user,
    onCloseDel,
    handleActive,
}: UserCardProps) => {
    return (
        <div className="bg-white border-sm shadow-lg w-1/5 p-5 m-4 rounded-md">
            <ImageCustom
                alt={"Test"}
                src={
                    user.userProfile?.avatar?.url ||
                    "https://hd-book-store.vercel.app/images/db_bg.jpeg"
                }
            />
            <div className="flex flex-col pt-5 pl-5 font-bold">
                <h1>
                    User Name:{" "}
                    <span className="font-normal">{user.userName}</span>
                </h1>
                <span>
                    Email: <span className="font-normal">{user.email}</span>
                </span>
                <div className="flex gap-x-10 items-center content-center">
                    Active:{" "}
                    <div
                        className={classNames(
                            "w-5 h-5 rounded-full",
                            user.activeFlag
                                ? "bg-green-400 border border-green-300"
                                : "bg-red-500 border border-red-300"
                        )}
                    ></div>
                </div>
                <span>
                    Full Name:{" "}
                    <span className="font-normal">
                        {user.userProfile?.name}
                    </span>
                </span>
            </div>
            <div className="flex justify-between font-bold p-5">
                <button
                    className="p-1 bg-blue-300  rounded-md hover:bg-blue-500"
                    onClick={() => handleActive(user)}
                >
                    Active
                </button>
                <button
                    className="p-1 bg-red-300  rounded-md hover:bg-red-500"
                    onClick={() => {
                        setIdDelete(id);
                        onCloseDel();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;

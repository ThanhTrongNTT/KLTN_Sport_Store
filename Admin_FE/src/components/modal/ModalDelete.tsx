import React from "react";

type ModalDeleteProps = {
    onCloseDelModal: () => void;
    title: string;
    id: string;
    handleDelete: (id: string) => void;
};
const ModalDelete = ({
    id,
    handleDelete,
    title,
    onCloseDelModal,
}: ModalDeleteProps) => {
    return (
        <div className="text-center p-10">
            <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
                {title}
            </h3>
            <div className="flex justify-center gap-4">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    color="failure"
                    onClick={() => {
                        handleDelete(id);
                        onCloseDelModal;
                    }}
                >
                    Vâng, tôi chắc chắn
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                    color="gray"
                    onClick={onCloseDelModal}
                >
                    Không, hủy bỏ
                </button>
            </div>
        </div>
    );
};

export default ModalDelete;

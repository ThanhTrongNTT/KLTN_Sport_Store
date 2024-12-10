import React from "react";
type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
};
const Modal = ({ isVisible, onClose, children }: ModalProps) => {
    if (!isVisible) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="flex flex-col">
                    <button
                        className="text-black text-xl place-self-end"
                        onClick={onClose}
                    >
                        X
                    </button>
                    <div className="bg-white p-2 rounded">{children}</div>
                </div>
            </div>
        </>
    );
};

export default Modal;

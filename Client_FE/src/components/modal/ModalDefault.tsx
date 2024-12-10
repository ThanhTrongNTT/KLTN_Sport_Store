import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
const ModalDefault = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="flex justify-center p-5">
            {" "}
            <button
                className="p-2 bg-slate-300 rounded-lg hover:bg-gray-400 hover:text-white"
                onClick={() => setOpenModal(true)}
            >
                Toggle modal
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 items-center content-center flex flex-col justify-center font-bold">
                        <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                            I love u
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            I love u more
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>
                        I accept
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalDefault;

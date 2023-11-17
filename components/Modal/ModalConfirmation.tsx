import { Modal } from "@mantine/core";
import { FaQuestion } from "react-icons/fa6";
import Button from "@/components/Ui/Button";

interface DialogModalConfirmationProps {
    open: boolean;
    handler: (value?: any) => void;
    onClickYa: (value?: any) => void;
    onClickTidak: (value?: any) => void;
    title: string | any;
}

const DialogModalConfirmation = ({ open, handler, onClickYa, onClickTidak, title }: DialogModalConfirmationProps) => {
    return (
        <Modal className="h-fit pb-3 text-sm text-black dark:bg-black dark:text-white-light" closeOnClickOutside={false} closeOnEscape={false} size="md" opened={open} onClose={handler} centered>
            <FaQuestion className="mx-auto h-auto w-28 text-info" />
            <p className="mt-4 mb-8 text-center text-lg text-black">{title}</p>
            <div className="mt-8 mb-4 flex justify-center gap-x-4">
                <Button className="bg-warning" onClick={onClickTidak}>
                    Tidak
                </Button>
                <Button className="bg-success" onClick={onClickYa}>
                    Ya
                </Button>
            </div>
        </Modal>
    );
};

export default DialogModalConfirmation;

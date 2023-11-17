import { Modal } from "@mantine/core";

interface DialogModalProps {
    open: boolean;
    size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    handler: (value?: any) => void;
    children: any;
    title?: string;
    heightFit?: boolean;
}

const DialogModal = ({ open, size, handler, children, title, heightFit = true }: DialogModalProps) => {
    return (
        <Modal
            closeOnClickOutside={false}
            closeOnEscape={false}
            size={size === "xs" ? "25%" : size === "sm" ? "40%" : size === "md" ? "60%" : size === "lg" ? "75%" : size === "xl" ? "85%" : size === "xxl" ? "100%" : "40%"}
            opened={open}
            onClose={handler}
            title={title}
            centered
        >
            <div className={`${heightFit ? "!h-fit" : "h-[60vh]"} no-scrollbar overflow-y-scroll pb-3 text-sm text-black dark:bg-black dark:text-white-light`}>{children}</div>
        </Modal>
    );
};

export default DialogModal;

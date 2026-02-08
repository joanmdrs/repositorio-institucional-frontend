import { Modal } from "antd";
import type { ReactNode } from "react";

interface ConfirmModalProps {
    open: boolean;
    title?: string;
    description?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmModal({
    open,
    title = "Confirmar ação",
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    danger = false,
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Modal
            open={open}
            title={title}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={confirmText}
            cancelText={cancelText}
            okButtonProps={{
                danger,
                loading,
            }}
        >
            {description}
        </Modal>
    );
}

export default ConfirmModal;

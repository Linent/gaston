import React from "react";
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      getPersistentElements={() => document.querySelectorAll(".Toastify")}
      backdrop={<div className="backdrop" />}
      className="dialog"
    >
      <DialogHeading className="heading">{title}</DialogHeading>
      <p className="description text-foreground-500">{description}</p>
      <div className="buttons">
        <Button className="button" onClick={onConfirm}>
          {confirmText}
        </Button>
        <DialogDismiss className="button secondary">{cancelText}</DialogDismiss>
      </div>
    </Dialog>
  );
};

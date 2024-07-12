import { ReactPortal, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  open,
  onClose,
  className = "",
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}): ReactPortal {
  const dialog = useRef<HTMLDialogElement>(null)!;

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal?.showModal();
    }

    return () => modal?.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!,
  );
}

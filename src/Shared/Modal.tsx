import { ReactPortal } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  open,
  onClose,
  className = "",
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}): ReactPortal | null {
  if (!open) return null;

  return createPortal(
    <div
      className={`
        absolute bg-slate-500 bg-opacity-50 
        top-0 bottom-0 left-0 right-0 z-auto
        ${className}
      `}
      onClick={onClose}
    >
      <div
        className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/4 bg-white rounded-md p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")!,
  );
}

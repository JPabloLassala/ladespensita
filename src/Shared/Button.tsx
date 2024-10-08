export function Button({
  label,
  onClick,
  className,
  isSubmit,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  isSubmit?: boolean;
}) {
  return (
    <button
      className={`btn btn-primary rounded px-5 py-2 ${className ?? ""}`}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
    >
      {label}
    </button>
  );
}

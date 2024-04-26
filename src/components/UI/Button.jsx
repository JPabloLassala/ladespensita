export function Button({ label, onClick, className, isSubmit }) {
  return (
    <button
      className={`btn btn-primary ml-4 rounded-lg px-5 py-2 ${className ?? ""}`}
      label={label}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
    >
      {label}
    </button>
  );
}

export function Checkbox({
  label,
  id,
  className,
  checked,
  onCheck,
}: {
  label: string;
  id: string;
  className?: string;
  checked?: boolean;
  onCheck?: () => void;
}) {
  return (
    <div className={`flex flex-row ${className ?? ""} items-center pt-6`}>
      <input
        checked={checked}
        name={id}
        id={id}
        type="checkbox"
        className="mx-2"
        onChange={onCheck}
      />
      <label htmlFor={id} className="font-semibold text-slate-700">
        {label}
      </label>
    </div>
  );
}

export function ProductoContainer({
  children,
  disabled,
  dimmed,
}: {
  disabled: boolean;
  dimmed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        rounded-md bg-white text-sm shadow-md duration-200 max-w-72
        hover:scale-105 hover:shadow-xl ${disabled ? "hidden" : ""}
        ${dimmed ? "grayscale brightness-90 shadow-none" : ""}
        `}
    >
      {children}
    </div>
  );
}

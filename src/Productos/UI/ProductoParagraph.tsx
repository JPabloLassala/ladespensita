export function ProductoParagraph({
  text,
  children,
  raw,
}: {
  text?: string;
  children?: React.ReactNode;
  raw?: boolean;
}) {
  return (
    <>
      {!raw && <p className="block truncate text-xs">{text}</p>}
      {raw && <p className="block truncate text-xs">{children}</p>}
    </>
  );
}

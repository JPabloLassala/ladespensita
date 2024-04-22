export function Header({ children }) {
  return (
    <header className="w-full font-header">
      <div className="items-top my-5 flex flex-row justify-between">{children}</div>
    </header>
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="w-full font-header">
      <div className="items-top flex flex-row justify-between py-5">{children}</div>
    </header>
  );
}

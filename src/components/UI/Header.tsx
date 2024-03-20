export function Header({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div className="mx-auto max-w-screen-xl font-header">
      <header className="items-top my-5 flex flex-row justify-between">{children}</header>
    </div>
  );
}

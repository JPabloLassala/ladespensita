export function Header({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div className="max-w-screen-xl mx-auto font-header">
      <header className="flex flex-row justify-between items-top my-5">{children}</header>
    </div>
  );
}

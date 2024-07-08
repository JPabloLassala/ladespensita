export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout" className="flex h-screen flex-col px-10 items-center">
      {children}
    </div>
  );
}

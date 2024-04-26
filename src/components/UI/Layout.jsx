export function Layout({ children }) {
  return (
    <div id="layout" className="flex h-screen flex-col px-10">
      {children}
    </div>
  );
}

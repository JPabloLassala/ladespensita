export function ProductosListContainer({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="Projects"
      className="mb-5 mt-10 grid gap-x-5 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
    >
      {children}
    </section>
  );
}

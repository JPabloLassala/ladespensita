export function AlquilerEntryContainer({ children }) {
  return (
    <div className="overflow-y-auto flex flex-col 2xl:w-1/5 w-1/4">
      <p className="text-2xl font-semibold font-body">Alquileres</p>
      <div className="grow shrink overflow-y-auto flex flex-col gap-2 rounded-md shadow-md mt-4 mb-8">
        {children}
      </div>
    </div>
  );
}

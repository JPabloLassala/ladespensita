export function AlquilerEntryContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-auto flex flex-col xl:w-1/3 w-80">
      <p className="text-2xl font-semibold font-body">Alquileres</p>
      <div className="grow shrink overflow-y-auto flex flex-col gap-2 rounded-md shadow-md mt-4 mb-8">
        {children}
      </div>
    </div>
  );
}

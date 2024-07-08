export function AlquilerInput({ titulo, value }: { titulo: string; value: string | number }) {
  return (
    <div className="flex flex-col w-1/2">
      <p className="font-body font-semibold text-lg">{titulo}</p>
      <input disabled className="border shadow p-2 rounded" value={value}></input>
    </div>
  );
}

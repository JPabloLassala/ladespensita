import { AlquilerSummaryItem } from "../../schemas";

export function AlquilerEntry({
  alquiler,
  dateRange,
  onSelectAlquiler,
  isSelected,
}: {
  alquiler: AlquilerSummaryItem;
  dateRange: string;
  onSelectAlquiler: () => void;
  isSelected: boolean;
}) {
  const selectedClass = isSelected ? "bg-red-200" : "bg-slate-50";

  return (
    <div
      key={alquiler.productora}
      className={`flex flex-col shrink-0 h-30 border p-4 rounded-xl shadow-md
        font-body bg-slate-50 hover:bg-slate-200 hover:cursor-pointer
        transition-colors duration-200 ${selectedClass}
        `}
      onClick={onSelectAlquiler}
    >
      <p className="text-2xl font-semibold">{alquiler.productora}</p>
      <p className="italic">{dateRange}</p>
      <p>
        Cantidad de productos: <span className="font-semibold">{alquiler.totalProductos}</span>
      </p>
    </div>
  );
}

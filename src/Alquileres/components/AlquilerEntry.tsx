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
  const selectedClass = isSelected
    ? "bg-red-100 border-red-300 hover:bg-red-200"
    : "bg-slate-50 border-slate-300 hover:bg-slate-200 hover:border-slate-400";

  return (
    <div
      key={alquiler.productora}
      className={`flex flex-col shrink-0 h-30 border p-4 rounded-xl shadow-md
        font-body hover:cursor-pointer
        transition-colors duration-100 ${selectedClass}
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

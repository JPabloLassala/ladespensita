import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlquilerSummaryItem } from "@schemas";

export function AlquilerEntry({
  alquiler,
  dateRange,
  isSelected,
  onSelectAlquiler,
  onDeleteAlquiler,
}: {
  alquiler: AlquilerSummaryItem;
  dateRange: string;
  isSelected: boolean;
  onSelectAlquiler: () => void;
  onDeleteAlquiler: () => void;
}) {
  const selectedClass = isSelected
    ? "bg-red-100 border-red-300 hover:bg-red-200"
    : "bg-slate-50 border-slate-300 hover:bg-slate-200 hover:border-slate-400";

  return (
    <div
      className={`
        flex flex-row shrink-0 border p-4 rounded-xl
        gap-4 shadow-md ${selectedClass} hover:cursor-pointer
        [transition:color_0.2s,transform_0.5s]
      `}
    >
      <div
        key={alquiler.productora}
        className="flex flex-col font-body transition-colors duration-1000 grow"
        onClick={onSelectAlquiler}
      >
        <p className="text-2xl font-semibold">{alquiler.productora}</p>
        <p className="text-xl">{alquiler.proyecto}</p>
        <p className="italic">{dateRange}</p>
        <p>
          Cantidad de productos: <span className="font-semibold">{alquiler.totalProductos}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-end">
        <FontAwesomeIcon icon={faTrash} onClick={onDeleteAlquiler} />
      </div>
    </div>
  );
}

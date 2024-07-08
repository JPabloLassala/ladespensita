import dayjs from "dayjs";
import { Alquiler } from "../../schemas";
import { AlquilerInput } from "./AlquilerInput";
import { AlquilerProductoItem } from "./AlquilerProductoItem";

export function AlquilerDetailsContainer({ selectedAlquiler }: { selectedAlquiler: Alquiler }) {
  const fechaInicio = dayjs(selectedAlquiler.fechaAlquiler.inicio).format("DD/MM/YYYY");
  const fechaFin = dayjs(selectedAlquiler.fechaAlquiler.fin).format("DD/MM/YYYY");
  const productos = selectedAlquiler.productos;

  return (
    <div className="flex flex-col grow mx-4 gap-4 w-full">
      <p className="text-2xl font-semibold font-body">Detalle de alquiler</p>
      <div className="flex flex-row gap-2">
        <AlquilerInput titulo="Productora" value={selectedAlquiler.productora} />
        <AlquilerInput titulo="Proyecto" value={selectedAlquiler.proyecto} />
      </div>
      <div className="flex flex-row gap-2">
        <AlquilerInput titulo="Fecha desde" value={fechaInicio} />
        <AlquilerInput titulo="Fecha hasta" value={fechaFin} />
      </div>
      <div className="grow shrink overflow-y-auto flex flex-row gap-2 h-full">
        <div className="flex flex-col w-1/2">
          <p className="font-body font-semibold text-lg">Productos</p>
          <div className="grow shrink overflow-y-auto w-full mb-8 flex-col rounded-md shadow-md border border-slate-100">
            {productos.map((p, i) => (
              <AlquilerProductoItem key={i} alquilerProducto={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

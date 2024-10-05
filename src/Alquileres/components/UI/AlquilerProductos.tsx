import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquilerProductoItem } from "./AlquilerProductoItem";

export function AlquilerProductos({
  productos,
  selectedProducto,
  handleSelectProducto,
}: {
  productos: AlquilerProductoEntity[];
  selectedProducto: AlquilerProductoEntity | undefined;
  handleSelectProducto: (alquilerProductoId: AlquilerProductoEntity) => void;
}) {
  return (
    <div className="grow shrink overflow-y-auto w-full mb-8 flex-col rounded-md shadow-md border border-slate-100">
      {productos.map((p) => {
        return (
          <AlquilerProductoItem
            key={p.producto.id}
            producto={p}
            isSelected={selectedProducto?.producto.id === p.producto.id}
            onSelectProducto={handleSelectProducto}
          />
        );
      })}
    </div>
  );
}

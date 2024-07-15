import { AlquilerProducto } from "@schemas";
import { AlquilerProductoItem } from "./AlquilerProductoItem";

export function AlquilerProductos({
  productos,
  selectedProducto,
  handleSelectProducto,
}: {
  productos: AlquilerProducto[];
  selectedProducto: AlquilerProducto | undefined;
  handleSelectProducto: (alquilerProductoId: AlquilerProducto) => void;
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

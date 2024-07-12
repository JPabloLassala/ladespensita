import { AlquilerProducto } from "../../schemas";

export function AlquilerProductoItem({
  alquilerProducto,
  onSelectProducto,
  isSelected,
}: {
  alquilerProducto: AlquilerProducto;
  onSelectProducto: (apId: AlquilerProducto) => void;
  isSelected: boolean;
}) {
  const selectedClass = isSelected
    ? "bg-red-100 border-red-300 hover:bg-red-200"
    : "bg-slate-50 border-slate-300 hover:bg-slate-200 hover:border-slate-400";

  return (
    <div
      className={`
        flex flex-row items-center border rounded-md mx-2 duration-100
        px-2 py-2 my-1 hover:cursor-pointer transition-colors
        ${selectedClass}`}
      onClick={() => onSelectProducto(alquilerProducto)}
    >
      <img
        src="http://localhost:3000/images/21.jpg"
        alt="Producto"
        className="object-contain w-20 rounded-md mr-2"
      />
      <div className="w-full">
        <div className="">
          <p className="font-bold text-lg">{alquilerProducto.producto.nombre}</p>
          <p>Cantidad: {alquilerProducto.cantidad}</p>
        </div>
      </div>
    </div>
  );
}

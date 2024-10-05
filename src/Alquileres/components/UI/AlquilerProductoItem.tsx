import { AlquilerProductoEntity } from "@/Alquileres/entities";
// import { AlquileresContext } from "@/Alquileres/stores";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { useContext } from "react";

export function AlquilerProductoItem({
  producto,
  onSelectProducto,
  isSelected,
}: {
  producto: AlquilerProductoEntity;
  onSelectProducto: (apId: AlquilerProductoEntity) => void;
  isSelected: boolean;
}) {
  // const { alquileres } = useContext(AlquileresContext)!;
  const selectedClass = isSelected
    ? "bg-red-100 border-red-300 hover:bg-red-200"
    : "bg-slate-50 border-slate-300 hover:bg-slate-200 hover:border-slate-400";

  return (
    <div
      className={`
        flex flex-row items-center border rounded-md mx-2 duration-100
        px-2 py-2 my-1 hover:cursor-pointer transition-colors
        ${selectedClass}`}
      onClick={() => onSelectProducto(producto)}
    >
      <img
        src="http://localhost:3000/images/21.jpg"
        alt="Producto"
        className="object-contain w-20 rounded-md mr-2"
      />
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <p className="font-bold text-lg">{producto.producto.nombre}</p>
          <div className="h-8 flex flex-row borde items-center shadow-lg rounded-lg border border-slate-300 bg-white divide-x">
            <div
              className="w-6 flex items-center justify-center h-full"
              // onClick={() => onIncreaseQuantity(producto.producto.id as string)}
              onClick={() => console.log("Increase quantity")}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="w-6 flex items-center justify-center border-slate-300">
              {producto.cantidad}
            </div>
            <div
              className="w-6 flex items-center justify-center h-full"
              // onClick={() => onDecreaseQuantity(producto.producto.id as string)}
              onClick={() => console.log("Decrease quantity")}
            >
              <FontAwesomeIcon icon={faMinus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

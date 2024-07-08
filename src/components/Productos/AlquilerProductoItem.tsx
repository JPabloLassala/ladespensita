import { AlquilerProducto } from "../../schemas";

export function AlquilerProductoItem({ alquilerProducto }: { alquilerProducto: AlquilerProducto }) {
  return (
    <div className="flex flex-row items-center border rounded-md mx-2 px-2 py-2 my-1 hover:cursor-pointer hover:bg-blue-100">
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

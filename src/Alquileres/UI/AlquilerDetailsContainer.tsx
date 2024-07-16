import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AlquilerProducto } from "@schemas";
import { AlquilerInput } from "./AlquilerInput";
import { AlquilerProductos } from "./AlquilerProductos";
import { useRouteLoaderData } from "react-router-dom";
import { useHttpRepository } from "@hooks";

export function AlquilerDetailsContainer() {
  const { id } = useRouteLoaderData("alquiler-detail") as { id: string };
  const [alquiler, setAlquiler] = useState<AlquilerProducto>();
  const { getAlquiler } = useHttpRepository<AlquilerProducto>(
    `http://localhost:3000/alquileres/${id}`,
    {},
    [],
  );

  useEffect(() => {
    if (data) {
      setAlquiler(data);
    }
  }, [getAlquiler]);

  const [selectedProducto, setSelectedProducto] = useState<AlquilerProducto | undefined>(undefined);
  const fechaInicio = dayjs(selectedAlquiler?.fechaAlquiler?.inicio || "1/1/1991").format(
    "DD/MM/YYYY",
  );
  const fechaFin = dayjs(selectedAlquiler?.fechaAlquiler?.fin || "1/1/1991").format("DD/MM/YYYY");
  const productos = selectedAlquiler?.productos || [];
  const handleSelectProducto = (alquilerProductoId: AlquilerProducto) =>
    setSelectedProducto(alquilerProductoId);

  return (
    <div className="overflow-y-hidden flex flex-col mx-4 gap-4 w-full">
      <p className="text-2xl font-semibold font-body">Detalle de alquiler</p>
      <div className="flex flex-row gap-2">
        <AlquilerInput bold titulo="Productora" value={selectedAlquiler.productora} />
        <AlquilerInput bold titulo="Proyecto" value={selectedAlquiler.proyecto} />
      </div>
      <div className="flex flex-row gap-2">
        <AlquilerInput bold titulo="Fecha desde" value={fechaInicio} />
        <AlquilerInput bold titulo="Fecha hasta" value={fechaFin} />
      </div>
      <div className="overflow-y-hidden flex flex-col">
        <p className="font-body font-semibold text-lg mb-1">Productos</p>
        <div className="overflow-y-auto gap-2 flex flex-row">
          <div className="flex flex-col w-1/2">
            <AlquilerProductos
              productos={productos}
              selectedProducto={selectedProducto}
              handleSelectProducto={handleSelectProducto}
            />
          </div>
          <div className="w-1/2">
            <AlquilerInput bold row titulo="Cantidad" value={selectedProducto?.cantidad || 0} />
            <AlquilerInput row titulo="Disponibles" value={selectedProducto?.cantidad || 0} />
            <AlquilerInput row titulo="Garantia unitario" value={selectedProducto?.cantidad || 0} />
            <AlquilerInput row titulo="Garantía total" value={selectedProducto?.cantidad || 0} />
            <AlquilerInput row titulo="Alquiler unitario" value={selectedProducto?.cantidad || 0} />
            <AlquilerInput row titulo="Alquiler subtotal" value={selectedProducto?.cantidad || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AlquilerIDLoader({ params }: any) {
  return { id: params.alquilerId };
}

import { AlquilerInput } from "./AlquilerInput";
import { AlquilerProductos } from "./AlquilerProductos";
import { useContext, useState } from "react";
import { AlquilerDateInput } from "./AlquilerDateInput";
import { AlquileresContext } from "@/Alquileres/stores";
import { AlquilerProductoEntity } from "@/Alquileres/entities";

export function NewAlquilerForm() {
  const { newAlquiler, setNewAlquiler } = useContext(AlquileresContext)!;
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoEntity | undefined>(
    undefined,
  );
  const productos = newAlquiler?.productos || [];

  function handleSelectProducto(alquilerProductoId: AlquilerProductoEntity) {
    setSelectedProducto(alquilerProductoId);
  }

  function handleChangeProperty(prop: string, value: string) {
    setNewAlquiler((prevAlquiler) => ({ ...prevAlquiler, [prop]: value }));
  }

  function handleChangeSinceDate(val: Date) {
    setNewAlquiler((prevAlquiler) => {
      return {
        ...prevAlquiler,
        fechaAlquiler: {
          ...prevAlquiler.fechaAlquiler,
          inicio: val,
        },
      };
    });
  }

  function handleChangeUntilDate(val: Date) {
    setNewAlquiler((prevAlquiler) => {
      return {
        ...prevAlquiler,
        fechaAlquiler: {
          ...prevAlquiler.fechaAlquiler,
          fin: val,
        },
      };
    });
  }

  return (
    <div className="overflow-y-hidden flex flex-col mx-4 gap-4 w-full">
      <p className="text-2xl font-semibold font-body">Detalle de alquiler</p>
      <div className="flex flex-row gap-2">
        <AlquilerInput
          bold
          titulo="Productora"
          value={newAlquiler.productora || ""}
          onChange={(val) => handleChangeProperty("productora", val)}
        />
        <AlquilerInput
          bold
          titulo="Proyecto"
          value={newAlquiler.proyecto || ""}
          onChange={(val) => handleChangeProperty("proyecto", val)}
        />
      </div>
      <div className="flex flex-row gap-2">
        <AlquilerDateInput bold titulo="Fecha desde" onChangeDate={handleChangeSinceDate} />
        <AlquilerDateInput bold titulo="Fecha hasta" onChangeDate={handleChangeUntilDate} />
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
            <AlquilerInput bold row titulo="Cantidad" value={selectedProducto?.cantidad || ""} />
            <AlquilerInput row titulo="Disponibles" value={selectedProducto?.cantidad || ""} />
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

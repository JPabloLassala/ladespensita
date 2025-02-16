import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "@/Alquileres/stores";
import { ProductoEntity } from "@/Productos";
import { Flex } from "@mantine/core";
import { useContext } from "react";
import { AlquilerProductoItem } from "./AlquilerProductoItem";

export function AlquilerProductosContainer({
  productos,
  alquilerProductos,
  onSelectProducto,
  onIncreaseAlquilerProducto,
  onDecreaseAlquilerProducto,
}: {
  productos: ProductoEntity[];
  alquilerProductos: AlquilerProductoEntity[];
  onSelectProducto: (producto: AlquilerProductoEntity) => void;
  onIncreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
  onDecreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
}) {
  const { selectedAlquiler } = useContext(AlquileresContext)!;

  return (
    <div
      style={{
        width: "50%",
        minHeight: "100%",
        maxHeight: "100%",
        overflow: "scroll",
      }}
    >
      <Flex direction="column" gap="0.5rem" style={{ flexShrink: 1 }}>
        {productos.map((producto) => {
          const productoInAlquiler = alquilerProductos?.find((p) => p.productoId === producto.id);
          return (
            <AlquilerProductoItem
              key={producto.id}
              producto={producto}
              quantity={productoInAlquiler?.cantidad || 0}
              productoInAlquiler={productoInAlquiler}
              onSelectProducto={() => onSelectProducto(productoInAlquiler!)}
              onIncreaseAlquilerProducto={onIncreaseAlquilerProducto}
              onDecreaseAlquilerProducto={onDecreaseAlquilerProducto}
              selectedAlquiler={selectedAlquiler}
            />
          );
        })}
      </Flex>
    </div>
  );
}

import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "@/Alquileres/stores";
import { ProductoEntity } from "@/Productos";
import { Button, Flex, Group, TextInput } from "@mantine/core";
import { useContext } from "react";
import { AlquilerProductoItem } from "./AlquilerProductoItem";

export function AlquilerProductosContainer({
  productos,
  alquilerProductos,
  onSelectProducto,
  onIncreaseAlquilerProducto,
}: {
  productos: ProductoEntity[];
  alquilerProductos: AlquilerProductoEntity[];
  onSelectProducto: (producto: AlquilerProductoEntity) => void;
  onIncreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
}) {
  const { selectedAlquiler } = useContext(AlquileresContext)!;

  return (
    <Flex direction="row" gap="1rem" mih="100%" mah="100%">
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
                productoInAlquiler={productoInAlquiler}
                onSelectProducto={onSelectProducto}
                onIncreaseAlquilerProducto={onIncreaseAlquilerProducto}
                selectedAlquiler={selectedAlquiler}
              />
            );
          })}
        </Flex>
      </div>
      <Flex direction="column" gap="0.5rem" w="50%">
        <TextInput w="15rem" label="Cantidad" defaultValue="0" />
        <TextInput w="15rem" label="Garantia unitario" />
        <TextInput w="15rem" label="Garantia total" />
        <TextInput w="15rem" label="Garantia subtotal" />
        <Group mt="1rem">
          <Button type="submit" color="blue" size="lg">
            Guardar
          </Button>
          <Button type="button" color="red" size="lg">
            Cancelar
          </Button>
        </Group>
      </Flex>
    </Flex>
  );
}

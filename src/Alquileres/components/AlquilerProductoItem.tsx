import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { ProductoEntity } from "@/Productos";
import { AspectRatio, Group, Image, Paper, Text } from "@mantine/core";
import { AlquilerProductoQuantity } from "./AlquilerProductoIncreaseDecrease";

export function AlquilerProductoItem({
  producto,
  alquilerProducto,
  onSelectProducto,
  onIncreaseAlquilerProducto,
  onDecreaseAlquilerProducto,
}: {
  producto: ProductoEntity;
  alquilerProducto: AlquilerProductoEntity | undefined;
  onSelectProducto: (productoId: number) => void;
  onIncreaseAlquilerProducto: () => void;
  onDecreaseAlquilerProducto: () => void;
}) {
  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      p="xs"
      key={producto.id}
      onClick={() => onSelectProducto(producto.id)}
    >
      <Group wrap="nowrap">
        <AspectRatio ratio={1} maw={75}>
          <Image src="http://localhost:3000/images/21.jpg" alt={producto.nombre} />
        </AspectRatio>
        <Text>{producto.nombre}</Text>
        <AlquilerProductoQuantity
          quantity={alquilerProducto?.cantidad || 0}
          onIncreaseAlquilerProducto={onIncreaseAlquilerProducto}
          onDecreaseAlquilerProducto={onDecreaseAlquilerProducto}
        />
      </Group>
    </Paper>
  );
}

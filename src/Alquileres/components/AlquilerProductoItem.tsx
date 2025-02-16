import { AlquilerProductoEntity, PartialAlquiler } from "@/Alquileres/entities";
import { ProductoEntity } from "@/Productos";
import { AspectRatio, Group, Image, Paper, Text } from "@mantine/core";
import { AlquilerProductoQuantity } from "./AlquilerProductoIncreaseDecrease";

export function AlquilerProductoItem({
  producto,
  quantity,
  onSelectProducto,
  onIncreaseAlquilerProducto,
  onDecreaseAlquilerProducto,
  selectedAlquiler,
}: {
  producto: ProductoEntity;
  quantity: number;
  productoInAlquiler: AlquilerProductoEntity | undefined;
  onSelectProducto: (producto: AlquilerProductoEntity) => void;
  onIncreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
  onDecreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
  selectedAlquiler: PartialAlquiler | undefined;
}) {
  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      p="xs"
      key={producto.id}
      onClick={() =>
        onSelectProducto(
          selectedAlquiler!.productos?.find((p) => p.id === producto.id) as AlquilerProductoEntity,
        )
      }
    >
      <Group wrap="nowrap">
        <AspectRatio ratio={1} maw={75}>
          <Image src="http://localhost:3000/images/21.jpg" alt={producto.nombre} />
        </AspectRatio>
        <Text>{producto.nombre}</Text>
        <AlquilerProductoQuantity
          alquilerId={selectedAlquiler?.id || 0}
          productoId={producto.id}
          quantity={quantity}
          onIncreaseAlquilerProducto={onIncreaseAlquilerProducto}
          onDecreaseAlquilerProducto={onDecreaseAlquilerProducto}
        />
      </Group>
    </Paper>
  );
}

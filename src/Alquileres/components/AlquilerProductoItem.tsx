import { AlquilerProductoEntity, PartialAlquiler } from "@/Alquileres/entities";
import { ProductoEntity } from "@/Productos";
import { AspectRatio, Group, Image, Indicator, Paper, Text } from "@mantine/core";
import { AlquilerProductoIncreaseDecrease } from "./AlquilerProductoIncreaseDecrease";

export function AlquilerProductoItem({
  producto,
  productoInAlquiler,
  onSelectProducto,
  onIncreaseAlquilerProducto,
  selectedAlquiler,
}: {
  producto: ProductoEntity;
  productoInAlquiler: AlquilerProductoEntity | undefined;
  onSelectProducto: (producto: AlquilerProductoEntity) => void;
  onIncreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
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
        <Indicator label={productoInAlquiler?.cantidad.toString() || "0"} color="red" size="lg">
          <AspectRatio ratio={1} maw={75}>
            <Image src="http://localhost:3000/images/21.jpg" alt={producto.nombre} />
          </AspectRatio>
        </Indicator>
        <Text>{producto.nombre}</Text>
        <AlquilerProductoIncreaseDecrease
          alquilerId={selectedAlquiler?.id || 0}
          productoId={producto.id}
          onIncreaseAlquilerProducto={onIncreaseAlquilerProducto}
        />
      </Group>
    </Paper>
  );
}

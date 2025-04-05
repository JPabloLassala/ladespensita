import { ProductoEntity } from "@/Productos";
import { AspectRatio, Group, Image, Paper, Text } from "@mantine/core";

export function AlquilerProductoItem({
  producto,
  onSelectProducto,
}: {
  producto: ProductoEntity;
  onSelectProducto: (productoId: number) => void;
}) {
  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      p="xs"
      key={producto.id}
      onClick={() => {
        onSelectProducto(producto.id);
        console.log("Producto seleccionado:", producto.id);
      }}
    >
      <Group wrap="nowrap" justify="space-between" align="center">
        <Group>
          <AspectRatio ratio={1} maw={75}>
            <Image src="http://localhost:3000/images/21.jpg" alt={producto.nombre} />
          </AspectRatio>
          <Text>{producto.nombre}</Text>
        </Group>
        <Group>
          Disponibles: <Text fw={700}>{producto.disponibles}</Text>
        </Group>
      </Group>
    </Paper>
  );
}

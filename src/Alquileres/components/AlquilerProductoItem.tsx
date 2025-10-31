import { ProductoEntity } from "@/Productos";
import {
  AspectRatio,
  Button,
  Group,
  Image,
  NumberInput,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { AlquilerProductoEntity } from "../entities";

export function AlquilerProductoItem({
  producto,
  alquilerProducto,
  onSelectProducto,
}: {
  producto: ProductoEntity;
  alquilerProducto: AlquilerProductoEntity | undefined;
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
          <Image
            src="http://localhost:3000/images/21.jpg"
            fallbackSrc={`https://placehold.co/75?text=Sin%20Foto`}
            w={75}
            alt={producto.nombre}
          />
          <Text>{producto.nombre}</Text>
        </Group>
        <Group>
          <Button size="compact-md" variant="outline">
            -
          </Button>
          <NumberInput hideControls w="4rem" fw={700} value={alquilerProducto?.cantidad || 0} />
          <Button size="compact-md" variant="outline">
            +
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

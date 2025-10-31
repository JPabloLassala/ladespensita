import { ProductoEntity } from "@/Productos";
import { Button, Group, Image, NumberInput, Paper, Text } from "@mantine/core";
import { GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";

export function AlquilerProductoItem({
  producto,
  onSelectProducto,
  inputProps,
}: {
  producto: ProductoEntity;
  onSelectProducto: (productoId: number) => void;
  inputProps: GetInputPropsReturnType;
}) {
  function handleIncreaseQuantity() {
    const newQuantity = (inputProps.value as number) || 0;
    inputProps.onChange(newQuantity + 1);
  }

  function handleDecreaseQuantity() {
    const newQuantity = (inputProps.value as number) || 0;
    if (newQuantity >= 0) {
      inputProps.onChange(newQuantity - 1 > 0 ? newQuantity - 1 : 0);
    }
  }

  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      p="xs"
      key={producto.id}
      onClick={() => onSelectProducto(producto.id)}
    >
      <Group wrap="nowrap" justify="space-between" align="center">
        <Group>
          <Image
            src="http://localhost:3000/images/21.jpg"
            fallbackSrc={`https://placehold.co/75?text=Sin%20Foto`}
            w={75}
            alt={producto.nombre}
          />
          <Text fw={700}>{producto.nombre}</Text>
        </Group>
        <Group>
          <Button size="compact-md" variant="outline" onClick={handleDecreaseQuantity}>
            -
          </Button>
          <NumberInput hideControls w="4rem" fw={700} {...inputProps} />
          <Button size="compact-md" variant="outline" onClick={handleIncreaseQuantity}>
            +
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

import { ProductoEntity } from "@/Productos";
import { Button, Group, Image, NumberInput, Paper, Stack, Text } from "@mantine/core";
import { GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";

export function AlquilerProductoItem({
  producto,
  onSelectProducto,
  isSelected,
  inputProps,
  remaining,
  tabIndex,
}: {
  producto: ProductoEntity;
  onSelectProducto: (productoId: number) => void;
  isSelected: boolean;
  inputProps: GetInputPropsReturnType;
  remaining: number | string;
  tabIndex: number;
}) {
  function handleIncreaseQuantity() {
    const quantity = (inputProps.value as number) || 0;

    if (remaining !== "-" && quantity === +remaining) {
      inputProps.onChange(remaining);
      return;
    }

    inputProps.onChange(quantity + 1);
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
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#e0f7fa" : "white",
        transition: "background-color 0.3s",
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
          <Stack>
            <Text fw={700}>{producto.nombre}</Text>
            <Text size="sm" color="dimmed">
              Disponible: {remaining}
            </Text>
          </Stack>
        </Group>
        <Group>
          <Button size="compact-md" variant="outline" onClick={handleDecreaseQuantity} tabIndex={-1}>
            -
          </Button>
          <NumberInput
            hideControls
            w="4rem"
            fw={700}
            {...inputProps}
            tabIndex={tabIndex}
            max={remaining !== "-" ? +remaining : undefined}
          />
          <Button size="compact-md" variant="outline" onClick={handleIncreaseQuantity} tabIndex={-1}>
            +
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

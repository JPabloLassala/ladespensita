import { ProductoEntity } from "@/Productos";
import { Button, Group, Image, NumberInput, Paper, Stack, Text } from "@mantine/core";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoRemaining,
} from "../entities";
import { GetInputPropsReturnType } from "node_modules/@mantine/form/lib/types";
import { useForm } from "@mantine/form";

export function AlquilerProductoItem({
  producto,
  remaining,
  alquilerProducto,
  onSelectProducto,
  inputProps,
}: {
  producto: ProductoEntity;
  remaining: AlquilerProductoRemaining;
  alquilerProducto: AlquilerProductoEntity | AlquilerProductoCreate | undefined;
  onSelectProducto: (productoId: number) => void;
  inputProps: GetInputPropsReturnType;
}) {
  const form = useForm({
    initialValues: {
      cantidad: inputProps.value?.cantidad || 0,
    },
    onValuesChange: (values) => {
      inputProps.onChange({
        ...inputProps.value,
        ...values,
        productoId: producto.id,
        cantidad: values.cantidad,
      });
    },
  });

  function handleIncreaseQuantity() {
    const newQuantity = (form.values.cantidad || 0) + 1;
    form.setFieldValue("cantidad", newQuantity);
  }

  function handleDecreaseQuantity() {
    const newQuantity = (form.values.cantidad || 0) - 1;
    if (newQuantity >= 0) {
      form.setFieldValue("cantidad", newQuantity);
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
          <Stack>
            <Text fw={700}>{producto.nombre}</Text>
            <Text>Disponibles: {remaining?.remaining || 0}</Text>
          </Stack>
        </Group>
        <Group>
          <Button size="compact-md" variant="outline" onClick={handleDecreaseQuantity}>
            -
          </Button>
          <NumberInput
            hideControls
            w="4rem"
            fw={700}
            value={alquilerProducto?.cantidad || 0}
            {...form.getInputProps("cantidad")}
          />
          <Button size="compact-md" variant="outline" onClick={handleIncreaseQuantity}>
            +
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

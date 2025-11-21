import { ProductoEntity } from "@/Productos";
import { Button, Group, Image, NumberInput, Paper, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "node_modules/@mantine/form/lib/types";
import { AlquilerProductoCreate } from "../entities";
import { useEffect, useState } from "react";
import { useAlquilerProductoContext } from "../stores";

type formType = UseFormReturnType<
  { productos: Record<number, AlquilerProductoCreate> },
  (values: { productos: Record<number, AlquilerProductoCreate> }) => {
    productos: Record<number, AlquilerProductoCreate>;
  }
>;

export function AlquilerProductoItem({
  producto,
  onSelectProducto,
  isSelected,
  form,
  remaining,
  tabIndex,
}: {
  producto: ProductoEntity;
  onSelectProducto: (productoId: number) => void;
  isSelected: boolean;
  form: formType;
  remaining: number | string;
  tabIndex: number;
}) {
  const [precio, setPrecio] = useState(producto.valorX1);
  const { createEmptyAlquilerProducto } = useAlquilerProductoContext();
  const alquilerProducto =
    form.values.productos[producto.id] || createEmptyAlquilerProducto(producto);
  if (producto.id === 550) console.log("alquiler item", alquilerProducto);

  const getUnitPrice = (quantity: number) => {
    if (quantity >= 12) return producto.valorX12;
    if (quantity >= 6) return producto.valorX6;
    if (quantity >= 3) return producto.valorX3;
    return producto.valorX1;
  };

  const updateAlquilerProducto = (partialValues: Partial<AlquilerProductoCreate>) => {
    const current = form.values.productos[producto.id] || createEmptyAlquilerProducto(producto);
    form.setFieldValue(
      `productos.${producto.id}`,
      { ...current, ...partialValues },
      { forceUpdate: true },
    );
  };

  function handleIncreaseQuantity() {
    const cantidad = alquilerProducto.cantidad;
    if (remaining !== "-" && cantidad === +remaining) return;

    const newQuantity = cantidad + 1;
    const unitPrice = getUnitPrice(newQuantity);
    setPrecio(unitPrice);

    updateAlquilerProducto({
      cantidad: newQuantity,
      precioFinal: newQuantity * unitPrice,
    });
  }

  function handleDecreaseQuantity() {
    const quantity = alquilerProducto.cantidad;

    if (quantity > 0) {
      const newQuantity = quantity - 1;
      const unitPrice = getUnitPrice(newQuantity);
      setPrecio(unitPrice);

      updateAlquilerProducto({
        cantidad: newQuantity,
        precioFinal: newQuantity * unitPrice,
      });
    }
  }

  useEffect(() => {
    if (!form.values.productos[producto.id]) {
      updateAlquilerProducto(alquilerProducto);
    }
  }, [producto.id]);

  useEffect(() => {
    setPrecio(getUnitPrice(alquilerProducto.cantidad));
  }, [alquilerProducto.cantidad]);

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
        backgroundColor: isSelected ? "var(--mantine-primary-color-light)" : "var(--mantine-white)",
        transition: "background-color 0.3s",
      }}
    >
      <Group wrap="nowrap" justify="space-between" align="center">
        <Group wrap="nowrap">
          <Image
            src={producto.image?.url}
            fallbackSrc={`https://placehold.co/75?text=Sin%20Foto`}
            w={75}
            alt={producto.nombre}
          />
          <Stack>
            <Text fw={700}>{producto.nombre}</Text>
            <Text size="sm">Disponible: {remaining}</Text>
          </Stack>
        </Group>
        <Group wrap="nowrap" align="center">
          <Stack>
            <Text size="sm">Precio final: {precio * alquilerProducto.cantidad}</Text>
            <Text size="sm">Precio unitario: ${precio}</Text>
          </Stack>
          <Button
            size="compact-md"
            variant="outline"
            onClick={handleDecreaseQuantity}
            tabIndex={-1}
          >
            -
          </Button>
          <NumberInput
            hideControls
            w="4rem"
            fw={700}
            {...form.getInputProps(`productos.${producto.id}.cantidad`)}
            tabIndex={tabIndex}
            max={remaining !== "-" ? +remaining : undefined}
          />
          <Button
            size="compact-md"
            variant="outline"
            onClick={handleIncreaseQuantity}
            tabIndex={-1}
          >
            +
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

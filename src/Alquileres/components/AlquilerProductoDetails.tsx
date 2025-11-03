import { NumberInput, Stack } from "@mantine/core";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "../entities";
import type { UseFormReturnType } from "@mantine/form";

export function AlquilerProductoDetails({
  form,
  productoIdx,
}: {
  form: UseFormReturnType<{
    productos: (AlquilerProductoCreate | AlquilerProductoUpdate | AlquilerProductoEntity)[];
  }>;
  productoIdx: number;
}) {
  return (
    <Stack component="div" gap="0.5rem" w="20%">
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia unitario"
        {...form.getInputProps(`productos.${productoIdx}.valorUnitarioGarantia`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia total"
        {...form.getInputProps(`productos.${productoIdx}.valorTotalGarantia`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor unitario alquiler"
        {...form.getInputProps(`productos.${productoIdx}.valorUnitarioAlquiler`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo producto"
        {...form.getInputProps(`productos.${productoIdx}.costoProducto`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo gráfica"
        {...form.getInputProps(`productos.${productoIdx}.costoGrafica`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo diseño"
        {...form.getInputProps(`productos.${productoIdx}.costoDiseno`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo total"
        {...form.getInputProps(`productos.${productoIdx}.costoTotal`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x1"
        {...form.getInputProps(`productos.${productoIdx}.valorX1`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x3"
        {...form.getInputProps(`productos.${productoIdx}.valorX3`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x6"
        {...form.getInputProps(`productos.${productoIdx}.valorX6`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x12"
        {...form.getInputProps(`productos.${productoIdx}.valorX12`)}
      />
    </Stack>
  );
}

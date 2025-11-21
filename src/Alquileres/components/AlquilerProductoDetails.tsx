import { NumberInput, Stack } from "@mantine/core";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "../entities";
import { type UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useAlquilerProductoContext } from "../stores";

export function AlquilerProductoDetails({
  form,
  selected,
}: {
  form: UseFormReturnType<
    { productos: Record<number, AlquilerProductoCreate> },
    (values: { productos: Record<number, AlquilerProductoCreate> }) => {
      productos: Record<number, AlquilerProductoCreate>;
    }
  >;
  selected: AlquilerProductoEntity | AlquilerProductoCreate | AlquilerProductoUpdate;
}) {
  useEffect(() => {
    const formDetailValues = form.values.productos[selected.productoId];
    form.setFieldValue(`productos.${selected.productoId}`, {
      ...formDetailValues,
      valorUnitarioGarantia: formDetailValues.valorUnitarioGarantia,
      valorTotalGarantia: formDetailValues.valorTotalGarantia,
      valorUnitarioAlquiler: formDetailValues.valorUnitarioAlquiler,
      costoProducto: formDetailValues.costoProducto,
      costoGrafica: formDetailValues.costoGrafica,
      costoDiseno: formDetailValues.costoDiseno,
      costoTotal: formDetailValues.costoTotal,
      valorX1: formDetailValues.valorX1,
      valorX3: formDetailValues.valorX3,
      valorX6: formDetailValues.valorX6,
      valorX12: formDetailValues.valorX12,
    });
  }, [selected]);

  return (
    <Stack component="div" gap="0.5rem" w="20%">
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia unitario"
        {...form.getInputProps(`productos.${selected.productoId}.valorUnitarioGarantia`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia total"
        {...form.getInputProps(`productos.${selected.productoId}.valorTotalGarantia`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor unitario alquiler"
        {...form.getInputProps(`productos.${selected.productoId}.valorUnitarioAlquiler`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo producto"
        {...form.getInputProps(`productos.${selected.productoId}.costoProducto`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo gráfica"
        {...form.getInputProps(`productos.${selected.productoId}.costoGrafica`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo diseño"
        {...form.getInputProps(`productos.${selected.productoId}.costoDiseno`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo total"
        {...form.getInputProps(`productos.${selected.productoId}.costoTotal`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x1"
        {...form.getInputProps(`productos.${selected.productoId}.valorX1`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x3"
        {...form.getInputProps(`productos.${selected.productoId}.valorX3`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x6"
        {...form.getInputProps(`productos.${selected.productoId}.valorX6`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x12"
        {...form.getInputProps(`productos.${selected.productoId}.valorX12`)}
      />
    </Stack>
  );
}

import { NumberInput, Stack } from "@mantine/core";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "../entities";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useAlquilerProductoContext } from "../stores";

type AlquilerProductoDetailsFormValues = {
  valorUnitarioGarantia: number;
  valorTotalGarantia: number;
  valorUnitarioAlquiler: number;
  costoProducto: number;
  costoGrafica: number;
  costoDiseno: number;
  costoTotal: number;
  valorX1: number;
  valorX3: number;
  valorX6: number;
  valorX12: number;
};

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
  const innerForm = useForm<AlquilerProductoDetailsFormValues>();
  useEffect(() => {
    innerForm.setValues({
      valorUnitarioGarantia: selected.valorUnitarioGarantia,
      valorTotalGarantia: selected.valorTotalGarantia,
      valorUnitarioAlquiler: selected.valorUnitarioAlquiler,
      costoProducto: selected.costoProducto,
      costoGrafica: selected.costoGrafica,
      costoDiseno: selected.costoDiseno,
      costoTotal: selected.costoTotal,
      valorX1: selected.valorX1,
      valorX3: selected.valorX3,
      valorX6: selected.valorX6,
      valorX12: selected.valorX12,
    });
  }, [selected]);
  const [debouncedValues] = useDebouncedValue(innerForm.values, 200);

  useEffect(() => {
    form.setFieldValue(`productos.${selected.productoId}`, {
      ...selected,
      ...form.values.productos[selected.productoId],
      valorUnitarioGarantia: debouncedValues.valorUnitarioGarantia,
      valorTotalGarantia: debouncedValues.valorTotalGarantia,
      valorUnitarioAlquiler: debouncedValues.valorUnitarioAlquiler,
      costoProducto: debouncedValues.costoProducto,
      costoGrafica: debouncedValues.costoGrafica,
      costoDiseno: debouncedValues.costoDiseno,
      costoTotal: debouncedValues.costoTotal,
      valorX1: debouncedValues.valorX1,
      valorX3: debouncedValues.valorX3,
      valorX6: debouncedValues.valorX6,
      valorX12: debouncedValues.valorX12,
    });
  }, [debouncedValues]);

  return (
    <Stack component="div" gap="0.5rem" w="20%">
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia unitario"
        {...innerForm.getInputProps(`valorUnitarioGarantia`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia total"
        {...innerForm.getInputProps(`valorTotalGarantia`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor unitario alquiler"
        {...innerForm.getInputProps(`valorUnitarioAlquiler`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo producto"
        {...innerForm.getInputProps(`costoProducto`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo gráfica"
        {...innerForm.getInputProps(`costoGrafica`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo diseño"
        {...innerForm.getInputProps(`costoDiseno`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo total"
        {...innerForm.getInputProps(`costoTotal`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x1"
        {...innerForm.getInputProps(`valorX1`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x3"
        {...innerForm.getInputProps(`valorX3`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x6"
        {...innerForm.getInputProps(`valorX6`)}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x12"
        {...innerForm.getInputProps(`valorX12`)}
      />
    </Stack>
  );
}

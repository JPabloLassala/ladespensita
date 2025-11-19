import { NumberInput, Stack } from "@mantine/core";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "../entities";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";

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
  const innerForm = useForm<
    Omit<
      AlquilerProductoCreate,
      | "productoId"
      | "alquilerId"
      | "costoGrafica"
      | "costoDiseno"
      | "costoProducto"
      | "costoTotal"
      | "cantidad"
      | "precioFinal"
    >
  >({});

  const [debounced] = useDebouncedValue(innerForm.values, 200);

  useEffect(() => {
    const formDetailValues = form.values.productos[selected.productoId];
    innerForm.setValues({ ...selected, ...formDetailValues });
  }, [selected]);

  useEffect(() => {
    form.setFieldValue(`productos.${selected.productoId}`, {
      ...form.values.productos[selected.productoId],
      ...debounced,
    });
  }, [debounced]);

  return (
    <Stack component="div" gap="0.5rem" w="20%">
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia unitario"
        {...innerForm.getInputProps("valorUnitarioGarantia")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Garantia total"
        {...innerForm.getInputProps("valorTotalGarantia")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor unitario alquiler"
        {...innerForm.getInputProps("valorUnitarioAlquiler")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo producto"
        {...innerForm.getInputProps("costoProducto")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo gráfica"
        {...innerForm.getInputProps("costoGrafica")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo diseño"
        {...innerForm.getInputProps("costoDiseno")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Costo total"
        {...innerForm.getInputProps("costoTotal")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x1"
        {...innerForm.getInputProps("valorX1")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x3"
        {...innerForm.getInputProps("valorX3")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x6"
        {...innerForm.getInputProps("valorX6")}
      />
      <NumberInput
        hideControls
        w="15rem"
        label="Valor x12"
        {...innerForm.getInputProps("valorX12")}
      />
    </Stack>
  );
}

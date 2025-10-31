import { Flex, NumberInput, Stack, TextInput } from "@mantine/core";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
  AlquilerUpdate,
} from "../entities";
import { GetInputPropsReturnType, UseFormReturnType } from "node_modules/@mantine/form/lib/types";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export function AlquilerProductoDetails({
  inputProps,
  selectedProducto,
}: {
  inputProps: GetInputPropsReturnType;
  selectedProducto: AlquilerProductoEntity | AlquilerProductoCreate;
}) {
  const innerForm = useForm<AlquilerProductoUpdate>({
    initialValues: {
      productoId: selectedProducto.productoId,
      valorUnitarioGarantia: inputProps.value?.valorUnitarioGarantia || 0,
      valorTotalGarantia: inputProps.value?.valorTotalGarantia || 0,
      costoGrafica: inputProps.value?.costoGrafica || 0,
      costoDiseno: inputProps.value?.costoDiseno || 0,
      costoTotal: inputProps.value?.costoTotal || 0,
      valorX1: inputProps.value?.valorX1 || 0,
      valorX3: inputProps.value?.valorX3 || 0,
      valorX6: inputProps.value?.valorX6 || 0,
      valorX12: inputProps.value?.valorX12 || 0,
    },
    onValuesChange: (values) => {
      inputProps.onChange({
        ...inputProps.value,
        ...values,
        productoId: selectedProducto.productoId,
      });
    },
  });

  return (
    <Stack component="div" gap="0.5rem">
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

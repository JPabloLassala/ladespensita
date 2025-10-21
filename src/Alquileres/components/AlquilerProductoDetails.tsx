import { Flex, NumberInput, TextInput } from "@mantine/core";
import { AlquilerProductoCreate, AlquilerProductoEntity, AlquilerUpdate } from "../entities";
import { GetInputPropsReturnType, UseFormReturnType } from "node_modules/@mantine/form/lib/types";
import { useForm } from "@mantine/form";

export function AlquilerProductoDetails({
  inputProps,
  selectedProducto,
}: {
  inputProps: GetInputPropsReturnType;
  selectedProducto: AlquilerProductoEntity | AlquilerProductoCreate;
}) {
  const innerForm = useForm({
    initialValues: {
      productoId: selectedProducto.productoId,
      cantidad: inputProps.value?.cantidad || 0,
      valorUnitarioGarantia: inputProps.value?.valorUnitarioGarantia || 0,
      valorTotalGarantia: inputProps.value?.valorTotalGarantia || 0,
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
    <Flex direction="column" gap="0.5rem" w="50%">
      <NumberInput
        hideControls
        w="15rem"
        label="Cantidad"
        {...innerForm.getInputProps(`cantidad`)}
      />
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
    </Flex>
  );
}

import { Flex, TextInput } from "@mantine/core";
import { AlquilerProductoCreate, AlquilerProductoEntity } from "../entities";

export function AlquilerProductoDetails({
  selectedProducto,
}: {
  selectedProducto: AlquilerProductoEntity | AlquilerProductoCreate;
}) {
  return (
    <Flex direction="column" gap="0.5rem" w="50%">
      <TextInput w="15rem" label="Cantidad" defaultValue={selectedProducto.cantidad} />
      <TextInput w="15rem" label="Garantia unitario" />
      <TextInput w="15rem" label="Garantia total" />
      <TextInput w="15rem" label="Garantia subtotal" />
    </Flex>
  );
}

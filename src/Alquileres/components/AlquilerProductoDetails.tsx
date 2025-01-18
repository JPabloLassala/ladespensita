import { Button, Flex, Group, TextInput } from "@mantine/core";
import { AlquilerProductoEntity } from "../entities";

export function AlquilerProductoDetails({
  selectedProducto,
}: {
  selectedProducto: AlquilerProductoEntity;
}) {
  return (
    <Flex direction="column" gap="0.5rem" w="50%">
      <TextInput w="15rem" label="Cantidad" defaultValue={selectedProducto.cantidad} />
      <TextInput w="15rem" label="Garantia unitario" />
      <TextInput w="15rem" label="Garantia total" />
      <TextInput w="15rem" label="Garantia subtotal" />
      <Group mt="1rem">
        <Button type="submit" color="blue" size="lg">
          Guardar
        </Button>
        <Button type="button" color="red" size="lg">
          Cancelar
        </Button>
      </Group>
    </Flex>
  );
}

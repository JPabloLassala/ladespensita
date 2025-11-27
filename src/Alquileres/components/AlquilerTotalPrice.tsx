import { UseFormReturnType } from "@mantine/form";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "../entities";
import { Group, Text } from "@mantine/core";

type AlquilerProductoLike =
  | AlquilerProductoUpdate
  | AlquilerProductoCreate
  | AlquilerProductoEntity;

type ProductosFormType = UseFormReturnType<
  { productos: Record<number, AlquilerProductoLike> },
  (values: { productos: Record<number, AlquilerProductoLike> }) => {
    productos: Record<number, AlquilerProductoLike>;
  }
>;

export const AlquilerTotalPrice = ({ form }: { form: ProductosFormType }) => {
  const precioFinal = Object.values(form.values.productos).reduce((total, producto) => {
    return total + (producto.precioFinal || 0);
  }, 0);

  return (
    <Group flex={1} justify="center" h="100%">
      <Text size="xl" fw={700}>
        Precio final: ${precioFinal}
      </Text>
    </Group>
  );
};

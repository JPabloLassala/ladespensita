import { UseFormReturnType } from "@mantine/form";
import { AlquilerProductoCreate, AlquilerProductoUpdate } from "../entities";

export type AlquilerProductosFormType = UseFormReturnType<
  {
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  },
  (values: { productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate> }) => {
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  }
>;

import { UseFormReturnType } from "@mantine/form";
import { AlquilerEntity } from "../entities";

export type AlquilerFormType = UseFormReturnType<
  Omit<Partial<AlquilerEntity>, "updatedAt" | "productos"> & {
    id: number;
  } & { fechas: (Date | null)[] },
  (
    values: Omit<Partial<AlquilerEntity>, "updatedAt" | "productos"> & {
      id: number;
    } & { fechas: (Date | null)[] },
  ) => Omit<Partial<AlquilerEntity>, "updatedAt" | "productos"> & {
    id: number;
  } & { fechas: (Date | null)[] }
>;

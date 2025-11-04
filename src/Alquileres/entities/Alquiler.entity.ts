import { AlquilerProductoEntity } from "./AlquilerProducto.entity";

export enum ALQUILER_STATUS {
  PENDING = "pendiente",
  ACTIVE = "activo",
  BUDGETED = "presupuestado",
  COMPLETED = "completado",
  CANCELLED = "cancelado",
}

export class AlquilerEntity {
  id: number;
  productora: string;
  proyecto: string;
  status: ALQUILER_STATUS;
  fechaPresupuesto: Date;
  fechaInicio: Date;
  fechaFin: Date;
  productos: AlquilerProductoEntity[];
  createdAt: Date;
  updatedAt?: Date;
}

export type AlquilerCreate = Omit<
  AlquilerEntity,
  "id" | "createdAt" | "updatedAt" | "productos" | "fechaInicio" | "fechaFin"
> & {
  fechaInicio: Date | null;
  fechaFin: Date | null;
};

export type AlquilerUpdate = Omit<Partial<AlquilerEntity>, "updatedAt" | "productos">;

export type AlquilerSummaryItem = {
  id: number;
  productora: string;
  proyecto: string;
  status: ALQUILER_STATUS;
  fechaInicio: string;
  fechaFin: string;
  totalProductos: number;
};

export type AlquilerSummaryItemCreate = Omit<AlquilerSummaryItem, "id">;

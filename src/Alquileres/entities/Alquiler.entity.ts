import { AlquilerProductoEntity } from "./AlquilerProducto.entity";

export enum ALQUILER_STATUS {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
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

export type AlquilerCreate = Omit<AlquilerEntity, "id" | "createdAt" | "updatedAt" | "productos">;

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

import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "./AlquilerProducto.entity";

export class AlquilerEntity {
  id: number;
  productora: string;
  proyecto: string;
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
  fechaInicio: string;
  fechaFin: string;
  totalProductos: number;
};

export type AlquilerSummaryItemCreate = Omit<AlquilerSummaryItem, "id">;

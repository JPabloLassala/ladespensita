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

export type AlquilerCreate = Omit<
  AlquilerEntity,
  "id" | "createdAt" | "updatedAt" | "productos"
> & {
  productos?: AlquilerProductoCreate[];
  id?: number;
};

export type AlquilerUpdate = Partial<Omit<AlquilerEntity, "productos">> & {
  productos?: AlquilerProductoUpdate[];
};

export type AlquilerSummaryItem = {
  id: number;
  productora: string;
  proyecto: string;
  since: string;
  until: string;
  totalProductos: number;
};

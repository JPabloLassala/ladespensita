import { AlquilerProductoEntity } from "./AlquilerProducto.entity";

export type Alquiler = {
  id: number;
  productora: string;
  proyecto: string;
  productos: AlquilerProductoEntity[];
  fechaPresupuesto: Date;
  fechaAlquiler: {
    inicio: Date;
    fin: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type AlquilerEntityCreate = Omit<Alquiler, "productos" | "createdAt" | "updatedAt">;

export type AlquilerSummaryItem = {
  id: number;
  productora: string;
  proyecto: string;
  since: string;
  until: string;
  totalProductos: number;
};

export type PartialAlquiler = Partial<Alquiler>;

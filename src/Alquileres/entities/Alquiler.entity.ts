import { AlquilerProductoEntity } from "./AlquilerProducto.entity";

export type Alquiler = {
  id: string;
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

export type AlquilerSummaryItem = {
  id: string;
  productora: string;
  proyecto: string;
  since: string;
  until: string;
  totalProductos: number;
};

export type PartialAlquiler = Omit<Partial<Alquiler>, "fechaAlquiler"> & {
  fechaAlquiler?: { inicio?: Date; fin?: Date };
};

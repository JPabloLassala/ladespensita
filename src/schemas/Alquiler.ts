import { ProductoType } from "./Producto";

export type Alquiler = {
  id: string;
  productora: string;
  proyecto: string;
  productos: AlquilerProducto[];
  fechaPresupuesto: Date;
  fechaAlquiler: {
    inicio: Date;
    fin: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type AlquilerProducto = {
  id: string;
  producto: ProductoType;
  unidadesAlquiladas: number;
  unidadesCotizadas: number;
  cantidad: number;
  valor: {
    unitarioGarantia: number;
    totalGarantia: number;
    unitarioAlquiler: number;
    x1: number;
    x3: number;
    x6: number;
    x12: number;
  };
};

export type AlquilerSummaryItem = {
  id: string;
  productora: string;
  proyecto: string;
  since: string;
  until: string;
  totalProductos: number;
};

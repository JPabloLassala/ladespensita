export type Alquiler = {
  id: number;
  productora: string;
  proyecto: string;
  since: string;
  until: string;
  products: AlquilerProduct[];
};

export type AlquilerProduct = {
  id: number;
  valorUnitarioGarantia: number;
  valorTotalGarantia: number;
  valorUnitarioAlquiler: number;
  subtotalAlquiler: number;
};

export type AlquilerSummaryItem = {
  id: number;
  productora: string;
  proyecto: string;
  since: string;
  until: string;
  totalProductos: number;
};

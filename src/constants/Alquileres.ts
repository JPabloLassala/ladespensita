import { Alquiler } from "../schemas/Alquiler";

export const initialAlquileres: Alquiler[] = [
  {
    id: 1,
    productora: "QUILMES",
    proyecto: "REBOLUCION",
    since: "2024-04-01T03:03",
    until: "2024-04-02T03:03",
    products: [
      {
        id: 4,
        valorUnitarioGarantia: 50000,
        valorTotalGarantia: 50000,
        valorUnitarioAlquiler: 10000,
        subtotalAlquiler: 10000,
      },
      {
        id: 5,
        valorUnitarioGarantia: 50000,
        valorTotalGarantia: 50000,
        valorUnitarioAlquiler: 10000,
        subtotalAlquiler: 10000,
      },
    ],
  },
  {
    id: 2,
    productora: "THE MOVEMENT/LANDIA",
    proyecto: "TADA",
    since: "2024-04-03T03:03",
    until: "2024-04-04T03:03",
    products: [
      {
        id: 1,
        valorUnitarioGarantia: 12000,
        valorTotalGarantia: 60000,
        valorUnitarioAlquiler: 6000,
        subtotalAlquiler: 36000,
      },
      {
        id: 2,
        valorUnitarioGarantia: 12000,
        valorTotalGarantia: 60000,
        valorUnitarioAlquiler: 6000,
        subtotalAlquiler: 36000,
      },
    ],
  },
  {
    id: 3,
    productora: "LANDIA",
    proyecto: "OREO",
    since: "2024-04-20T03:03",
    until: "2024-04-30T03:03",
    products: [
      {
        id: 4,
        valorUnitarioGarantia: 6000,
        valorTotalGarantia: 6000,
        valorUnitarioAlquiler: 3000,
        subtotalAlquiler: 3000,
      },
    ],
  },
];

import { createContext, useState } from "react";

/**
 * @typedef {Object} Alquiler
 * @property {number} id
 * @property {string} productora
 * @property {string} proyecto
 * @property {string} since
 * @property {string} until
 * @property {Array<{
 * id: number,
 * valorUnitarioGarantia: number,
 * valorTotalGarantia: number,
 * valorUnitarioAlquiler: number,
 * subtotalAlquiler: number
 * }>} products
 */

/**
 * @typedef {Object} AlquilerSummaryItem
 * @property {number} id
 * @property {string} productora
 * @property {string} proyecto
 * @property {string} since
 * @property {string} until
 * @property {number} totalProductos
 */

export const initialAlquileres = [
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

export const AlquileresContext = createContext({
  /**
   * @type {Array<{Alquiler}>
   */
  alquileres: [],
  setalquileres: () => {},
  /**
   * @param {string} sinceDate
   * @param {string} untilDate
   * @returns {Array<{Alquiler}>}
   */
  getAlquileresBetweenDates: () => {},
  /**
   * @returns {Array<{AlquilerSummaryItem}>}
   */
  getSummary: () => {},
});

export function AlquileresContextProvider({ children }) {
  const [alquileres, setAlquileres] = useState(initialAlquileres);
  const getSummary = () => {
    return initialAlquileres.map(alquiler => {
      return {
        id: alquiler.id,
        productora: alquiler.productora,
        proyecto: alquiler.proyecto,
        since: alquiler.since,
        until: alquiler.until,
        totalProductos: alquiler.products.length,
      };
    });
  };
  const getAlquileresBetweenDates = (sinceDate, untilDate) => {
    if (!sinceDate && !untilDate) {
      return initialAlquileres;
    }

    return initialAlquileres.filter(alquiler => {
      return alquiler.since >= sinceDate && alquiler.until <= untilDate;
    });
  };

  const alquileresCtx = {
    alquileres,
    setAlquileres,
    getSummary,
    getAlquileresBetweenDates,
  };

  return <AlquileresContext.Provider value={alquileresCtx}>{children}</AlquileresContext.Provider>;
}

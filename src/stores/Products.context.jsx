import { createContext, useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Arveja lata",
    unidadesMetroLineal: 12,
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "21.jpg",
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    etiquetas: [],
  },
  {
    id: 2,
    name: "Arveja lata",
    unidadesMetroLineal: 12,
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "21.jpg",
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    etiquetas: ["abollada"],
  },
  {
    id: 3,
    name: "Choclo lata",
    unidadesMetroLineal: 12,
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "20.jpg",
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    etiquetas: [],
  },
  {
    id: 4,
    name: "Arveja lata",
    unidadesMetroLineal: 12,
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "21.jpg",
    etiquetas: [],
  },
  {
    id: 5,
    name: "Choclo lata",
    unidadesMetroLineal: 12,
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "20.jpg",
    etiquetas: ["abollada", "descolorada"],
  },
  {
    id: 6,
    name: "Arveja lata",
    unidadesMetroLineal: 12,
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "21.jpg",
    etiquetas: [],
  },
  {
    id: 7,
    name: "Choclo lata",
    unidadesMetroLineal: 12,
    medidas: {
      altura: 8,
      diametro: 8.3,
    },
    unidadesDisponibles: 11,
    unidadesTotales: 11,
    img: "20.jpg",
    etiquetas: [],
  },
];

export const ProductsContext = createContext({
  products: [],
  showProductDetails: () => {},
  hideProductDetails: () => {},
});

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const productsCtx = {
    products,
    setProducts,
  };

  return <ProductsContext.Provider value={productsCtx}>{children}</ProductsContext.Provider>;
}

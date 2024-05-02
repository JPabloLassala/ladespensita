export type Product = {
  id?: number;
  name: string;
  unidadesMetroLineal: number;
  unidadesDisponibles: number;
  unidadesTotales: number;
  img: string;
  medidas: {
    altura: number;
    diametro: number;
    ancho?: number;
    profundidad?: number;
  };
  etiquetas: string[];
};

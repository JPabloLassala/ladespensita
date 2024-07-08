export type ProductoType = {
  id?: number;
  nombre: string;
  unidadesMetroLineal: number;
  img: string;
  medidas: {
    altura?: number;
    diametro?: number;
    ancho?: number;
    profundidad?: number;
  };
  valor: {
    unitarioGarantia: number;
    x1: number;
    x3: number;
    x6: number;
    x12: number;
  };
  costo: {
    producto: number;
    grafica: number;
    diseno: number;
    total: number;
  };
  etiquetas: string[];
};
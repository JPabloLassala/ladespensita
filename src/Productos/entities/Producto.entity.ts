import { FileWithPath } from "@mantine/dropzone";

export class ProductoImage {
  id: number;
  url: string;
  productoId: number;
  isMain: boolean;
  createdAt: Date;
}

export class ProductoEntity {
  id: number;
  nombre: string;
  unidadesMetroLineal: number;
  img: string;
  totales: number;
  disponibles?: number;
  medidas: {
    altura?: number;
    diametro?: number;
    ancho?: number;
    profundidad?: number;
  };
  valor: {
    unitarioGarantia: number;
    unitarioAlquiler: number;
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
  image?: ProductoImage;
}

export type ProductoEntityCreate = {
  nombre: string;
  unidadesMetroLineal: number;
  totales: number;
  disponibles?: number;
  altura?: number;
  diametro?: number;
  ancho?: number;
  profundidad?: number;
  valorUnitarioGarantia: number;
  valorUnitarioAlquiler: number;
  valorx1: number;
  valorx3: number;
  valorx6: number;
  valorx12: number;
  file?: FileWithPath;
};

export type ProductoEntityUpdate = Omit<ProductoEntityCreate, "createdAt" | "updatedAt"> & {
  id: number;
  file?: FileWithPath;
};

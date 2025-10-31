import { FileWithPath } from "@mantine/dropzone";
import { ImageEntity } from "./Image.entity";

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
  totales: number;
  medidasAltura: number;
  medidasAncho?: number;
  medidasProfundidad?: number;
  medidasDiametro?: number;
  costoProducto: number;
  costoGrafica: number;
  costoDiseno: number;
  costoTotal: number;
  valorUnitarioGarantia: number;
  valorUnitarioAlquiler: number;
  valorX1: number;
  valorX3: number;
  valorX6: number;
  valorX12: number;
  image: ImageEntity;
  createdAt: Date;
  updatedAt?: Date;
}

export type ProductoEntityCreate = Omit<
  ProductoEntity,
  "id" | "createdAt" | "updatedAt" | "image"
> & {
  file?: FileWithPath;
  tmpURL?: string;
};

export type ProductoEntityUpdate = Partial<ProductoEntityCreate> & {
  id: number;
  tmpURL?: string;
};

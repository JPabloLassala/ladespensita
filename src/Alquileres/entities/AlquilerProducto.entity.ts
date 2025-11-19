import { ProductoEntity } from "@/Productos";
import { AlquilerEntity } from "./Alquiler.entity";

export type AlquilerProductoEntity = {
  id: number;
  productoId: number;
  alquilerId: number;
  costoGrafica: number;
  costoDiseno: number;
  costoProducto: number;
  costoTotal: number;
  cantidad: number;
  precioFinal: number;
  valorUnitarioGarantia: number;
  valorTotalGarantia: number;
  valorUnitarioAlquiler: number;
  valorX1: number;
  valorX3: number;
  valorX6: number;
  valorX12: number;
  producto?: ProductoEntity;
  alquiler?: AlquilerEntity;

  createdAt: Date;
  updatedAt?: Date;
};

export type AlquilerProductoCreate = Omit<
  AlquilerProductoEntity,
  "id" | "alquilerId" | "createdAt" | "updatedAt" | "producto" | "alquiler"
> & {
  alquilerId?: number;
};

export type AlquilerProductoUpdate = Omit<
  AlquilerProductoEntity,
  "id" | "alquilerId" | "createdAt" | "updatedAt" | "producto" | "alquiler"
> & {
  id?: number;
  alquilerId?: number;
  createdAt?: Date;
};

import { ProductoEntity } from "@/Productos";
import { AlquilerEntity } from "./Alquiler.entity";

export type AlquilerProductoEntity = {
  id: number;
  productoId: number;
  alquilerId: number;
  costoProducto: number;
  costoGrafica: number;
  costoDiseno: number;
  costoTotal: number;
  cantidad: number;
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
  id?: number;
  alquilerId?: number;
};

export type AlquilerProductoUpdate = Partial<AlquilerProductoEntity> & {
  id?: number;
};

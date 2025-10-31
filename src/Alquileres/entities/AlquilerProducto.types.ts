export type AlquilerProductoStock = {
  productoId: number;
  stock: number;
  inUse: number;
  requested: number;
};

export type AlquilerProductoRemaining = {
  productoId: number;
  remaining: number;
};

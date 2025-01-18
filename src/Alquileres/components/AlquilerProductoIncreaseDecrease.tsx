import { Button } from "@mantine/core";

export function AlquilerProductoIncreaseDecrease({
  alquilerId,
  productoId,
  onIncreaseAlquilerProducto,
}: {
  alquilerId: number;
  productoId: number;
  onIncreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
}) {
  return (
    <>
      <Button
        variant="outline"
        onClick={() => onIncreaseAlquilerProducto(alquilerId, productoId)}
        color="gray"
        size="xs"
      >
        -
      </Button>
      <Button
        variant="outline"
        onClick={() => onIncreaseAlquilerProducto(alquilerId, productoId)}
        color="gray"
        size="xs"
      >
        +
      </Button>
    </>
  );
}

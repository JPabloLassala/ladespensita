import { Button, Group, NumberInput } from "@mantine/core";

export function AlquilerProductoQuantity({
  alquilerId,
  productoId,
  quantity,
  onIncreaseAlquilerProducto,
  onDecreaseAlquilerProducto,
}: {
  alquilerId: number;
  productoId: number;
  quantity: number;
  onIncreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
  onDecreaseAlquilerProducto: (alquilerId: number, productoId: number) => void;
}) {
  return (
    <Group wrap="nowrap" flex={1} align="center">
      <Button
        variant="outline"
        onClick={() => onIncreaseAlquilerProducto(alquilerId, productoId)}
        color="gray"
        size="xs"
      >
        -
      </Button>
      <NumberInput
        value={quantity}
        onChange={() => {}}
        hideControls
        min={0}
        w="4rem"
        styles={{
          input: {
            flexShrink: 0,
            textAlign: "center",
          },
        }}
      />
      <Button
        variant="outline"
        onClick={() => onDecreaseAlquilerProducto(alquilerId, productoId)}
        color="gray"
        size="xs"
      >
        +
      </Button>
    </Group>
  );
}

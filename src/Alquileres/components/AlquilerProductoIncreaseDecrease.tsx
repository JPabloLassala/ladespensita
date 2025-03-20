import { Button, Group, NumberInput } from "@mantine/core";

export function AlquilerProductoQuantity({
  quantity,
  onIncreaseAlquilerProducto,
  onDecreaseAlquilerProducto,
}: {
  quantity: number;
  onIncreaseAlquilerProducto: () => void;
  onDecreaseAlquilerProducto: () => void;
}) {
  return (
    <Group wrap="nowrap" flex={1} align="center">
      <Button
        variant="outline"
        onClick={onDecreaseAlquilerProducto}
        color="gray"
        size="xs"
        disabled={quantity === 0}
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
      <Button variant="outline" onClick={onIncreaseAlquilerProducto} color="gray" size="xs">
        +
      </Button>
    </Group>
  );
}

import { Button, Group, NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";

export function AlquilerProductoQuantity({
  quantity,
  onIncreaseAlquilerProducto,
  onDecreaseAlquilerProducto,
  onChangeAlquilerProductoQuantity,
}: {
  quantity: number;
  onIncreaseAlquilerProducto: () => void;
  onDecreaseAlquilerProducto: () => void;
  onChangeAlquilerProductoQuantity: (quantity: number) => void;
}) {
  const handleDelayedUpdate = useDebouncedCallback(onChangeAlquilerProductoQuantity, 200);

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
        onChange={(value: number | string) => handleDelayedUpdate(parseInt(value.toString()))}
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

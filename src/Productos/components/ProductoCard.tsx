import { Badge, Card, Group, Image, Overlay, Text } from "@mantine/core";
import { ProductoEntity, ProductoEntityUpdate } from "../entities";
import { useDisclosure } from "@mantine/hooks";
import { EditProductoModal } from "./EditProductoModal";

export function ProductoCard({
  producto,
  disabled,
  onUpdate,
}: {
  producto: ProductoEntity;
  disabled: boolean;
  dimmed: boolean;
  onUpdate: (_: ProductoEntityUpdate, id: number) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <EditProductoModal opened={opened} onClose={close} producto={producto} onUpdate={onUpdate} />
      <Card shadow="sm" padding="md" radius="md" withBorder mt={3} onClick={open}>
        <Card.Section>
          <Image
            src={producto.image?.url}
            fallbackSrc="https://placehold.co/160x300?text=Sin%20Foto"
            height={160}
          />
          {disabled && <Overlay color="#000" backgroundOpacity={0.35} blur={5} />}
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{producto.nombre}</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>
      </Card>
    </>
  );
}

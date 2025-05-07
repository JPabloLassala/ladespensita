import { Card, Group, Image, Overlay, Text } from "@mantine/core";
import { ProductoEntity, ProductoEntityUpdate } from "../entities";
import { useDisclosure } from "@mantine/hooks";
import { EditProductoModal } from "./EditProductoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function ProductoCard({
  producto,
  disabled,
  onUpdate,
  onDelete,
}: {
  producto: ProductoEntity;
  disabled: boolean;
  dimmed: boolean;
  onUpdate: (_: ProductoEntityUpdate, id: number) => void;
  onDelete: (id: number) => void;
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
          <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(producto.id)} className="p-4" />
        </Group>
      </Card>
    </>
  );
}

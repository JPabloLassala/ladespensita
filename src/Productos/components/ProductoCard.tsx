import { Button, Card, Group, Image, Overlay, Popover, Stack, Text } from "@mantine/core";
import { ProductoEntity } from "../entities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../Css/hover-trash.css";

export function ProductoCard({
  producto,
  disabled,
  onEdit,
  onDelete,
}: {
  producto: ProductoEntity;
  disabled: boolean;
  dimmed: boolean;
  onEdit: (producto: ProductoEntity) => void;
  onDelete: (id: number) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    setDeleteOpen(false);
    onDelete(producto.id);
  };

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder w={230}>
      <Card.Section>
        <Image
          onClick={() => onEdit(producto)}
          src={producto.image?.url}
          fallbackSrc="https://placehold.co/160x300?text=Sin%20Foto"
          height={160}
        />
        {disabled && <Overlay color="#000" backgroundOpacity={0.35} blur={5} />}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" wrap="nowrap" align="baselines">
        <Text fw={500}>{producto.nombre}</Text>
        <Popover
          width={300}
          opened={deleteOpen}
          onChange={setDeleteOpen}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <FontAwesomeIcon
              className="hover-trash"
              icon={faTrash}
              onClick={() => setDeleteOpen(true)}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <Text size="sm">¿Borrar producto?</Text>
              <Group>
                <Button color="red" onClick={handleDelete}>
                  Borrar
                </Button>
                <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Card>
  );
}

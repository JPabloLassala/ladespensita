import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, Group, Stack, Text } from "@mantine/core";
import { DeleteAlquilerModal } from "@/Alquileres/pages";
import { useState } from "react";
import dayjs from "dayjs";
import { useAlquilerContext } from "@/Alquileres/stores";

export function NewAlquilerItem({ onDeleteAlquiler }: { onDeleteAlquiler: () => void }) {
  const { newAlquiler } = useAlquilerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateInicio = newAlquiler?.fechaInicio
    ? dayjs(newAlquiler.fechaInicio).format("DD/MM/YYYY")
    : "";
  const dateFin = newAlquiler?.fechaFin ? dayjs(newAlquiler.fechaFin).format("DD/MM/YYYY") : "";
  const dateRange = `${dateInicio} - ${dateFin}`;

  return (
    <Card
      shadow="xs"
      padding="lg"
      radius="md"
      mx="0.5rem"
      withBorder
      style={{ backgroundColor: "var(--mantine-primary-color-light)" }}
    >
      <Card.Section withBorder py="1rem">
        <Group justify="space-between" px="1rem" wrap="nowrap">
          <Text fw={700}>{newAlquiler!.proyecto}</Text>
          <DeleteAlquilerModal
            onAccept={onDeleteAlquiler}
            isModalOpen={isModalOpen}
            onCloseModal={() => setIsModalOpen(false)}
          >
            <FontAwesomeIcon icon={faTrash} onClick={() => setIsModalOpen(true)} className="p-4" />
          </DeleteAlquilerModal>
        </Group>
      </Card.Section>
      <Card.Section p="md">
        <Stack gap="0.5rem">
          <Text>{newAlquiler!.productora}</Text>
          <Text>{dateRange}</Text>
        </Stack>
      </Card.Section>
    </Card>
  );
}

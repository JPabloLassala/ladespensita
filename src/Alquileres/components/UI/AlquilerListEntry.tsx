import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlquilerSummaryItem } from "@/Alquileres/entities";
import { Card, Group, Stack, Text } from "@mantine/core";
import { DeleteAlquilerModal } from "@/Alquileres/pages";
import { useState } from "react";

export function AlquilerListEntry({
  alquiler,
  dateRange,
  isSelected,
  onSelectAlquiler,
  onDeleteAlquiler,
}: {
  alquiler: AlquilerSummaryItem;
  dateRange: string;
  isSelected: boolean;
  onSelectAlquiler: () => void;
  onDeleteAlquiler: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card
      key={alquiler.productora}
      shadow="xs"
      padding="lg"
      radius="md"
      mx="0.5rem"
      withBorder
      onClick={onSelectAlquiler}
    >
      <Card.Section color="red" withBorder py="1rem">
        <Group justify="space-between" px="1rem" wrap="nowrap">
          <Group wrap="nowrap">
            {isSelected && <FontAwesomeIcon icon={faChevronRight} />}
            <Text fw={700}>{alquiler.proyecto}</Text>
          </Group>
          <DeleteAlquilerModal
            onAccept={onDeleteAlquiler}
            key={alquiler.id}
            isModalOpen={isModalOpen}
            onCloseModal={() => setIsModalOpen(false)}
          >
            <FontAwesomeIcon icon={faTrash} onClick={() => setIsModalOpen(true)} className="p-4" />
          </DeleteAlquilerModal>
        </Group>
      </Card.Section>
      <Card.Section p="md">
        <Stack gap="0.5rem">
          <Text>{alquiler.productora}</Text>
          <Text>{dateRange}</Text>
          <Text>
            Cantidad de productos: <span className="font-semibold">{0}</span>
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
}
